"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { applyDithering, KERNEL_OPTIONS } from './image-processor';
import styles from "./style.module.scss";
import globalStyles from "../../styles/UnifiedToolPage.module.scss";
import defaultImage from './default.jpg';

export default function PntEditorClient() {
    const [imgSrc, setImgSrc] = useState(defaultImage.src);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState('');
    const [kernel, setKernel] = useState('Riemersma');
    const [fileName, setFileName] = useState('PNTConvertor');

    const [outputWidth, setOutputWidth] = useState(256);
    const [outputHeight, setOutputHeight] = useState(256);
    const [keepAspectRatio, setKeepAspectRatio] = useState(true);

    const imgRef = useRef<HTMLImageElement>(null);
    const ditheredCanvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handlePaste = useCallback(async (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
            if (item.type.indexOf("image") !== -1) {
                const blob = item.getAsFile();
                if (blob) {
                    setCrop(undefined);
                    const reader = new FileReader();
                    reader.onload = (e) => setImgSrc(e.target?.result as string);
                    reader.readAsDataURL(blob);
                }
                break;
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const cropAspect = keepAspectRatio ? outputWidth / outputHeight : width / height;
        const newCrop = centerCrop(
            makeAspectCrop({ unit: 'px', width: width * 0.9 }, cropAspect, width, height),
            width,
            height,
        );
        setCrop(newCrop);
        setCompletedCrop(newCrop);
    }

    const generatePreviews = useCallback(async () => {
        if (!completedCrop || !imgRef.current || !ditheredCanvasRef.current || !imgSrc) return;

        const image = imgRef.current;
        const ditheredCanvas = ditheredCanvasRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const cropX = completedCrop.x * scaleX, cropY = completedCrop.y * scaleY;
        const cropWidth = completedCrop.width * scaleX, cropHeight = completedCrop.height * scaleY;

        if (cropWidth === 0 || cropHeight === 0) return;

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropWidth; cropCanvas.height = cropHeight;
        const cropCtx = cropCanvas.getContext('2d');
        if (!cropCtx) return;
        cropCtx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = outputWidth; resizedCanvas.height = outputHeight;
        const resizedCtx = resizedCanvas.getContext('2d');
        if (!resizedCtx) return;
        resizedCtx.imageSmoothingEnabled = false;
        resizedCtx.drawImage(cropCanvas, 0, 0, outputWidth, outputHeight);
        setCroppedPreviewUrl(resizedCanvas.toDataURL());

        ditheredCanvas.width = outputWidth; ditheredCanvas.height = outputHeight;
        const ditheredCtx = ditheredCanvas.getContext('2d');
        if (!ditheredCtx) return;
        ditheredCtx.imageSmoothingEnabled = false;
        ditheredCtx.drawImage(resizedCanvas, 0, 0);
        applyDithering(ditheredCtx, outputWidth, outputHeight, kernel);

    }, [completedCrop, kernel, outputWidth, outputHeight, imgSrc]);

    useEffect(() => {
        generatePreviews();
    }, [generatePreviews]);

    const handleDownload = () => {
        if (!ditheredCanvasRef.current) return;
        const canvas = ditheredCanvasRef.current;
        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `${fileName || 'download'}.pnt`;
            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(url);
        }, 'image/png');
    };

    return (
        <div className={globalStyles.toolPage}>
            <h1>PNT Image Editor</h1>
            <p>Upload an image, select an area, choose a dithering kernel, and download the result.</p>

            <div className={styles.topSection}>
                <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
                    <p>Drop an image here or click to select</p>
                    <div className={styles.uploadButtons}>
                        <button className={globalStyles.actionButton} onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>Select File</button>
                        <button className={globalStyles.actionButton} onClick={(e) => { e.stopPropagation(); navigator.clipboard.readText().then(handlePaste as any); }}>Paste Clipboard</button>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                </div>
            </div>

            <div className={`${styles.controlsRow}`}>
                <div className={globalStyles.inputColumn}>
                    <label className={globalStyles.label}>Kernel</label>
                    <select value={kernel} onChange={(e) => setKernel(e.target.value)} className={globalStyles.primarySelect}>
                        {KERNEL_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                <div className={globalStyles.inputColumn}>
                    <label className={globalStyles.label}>Output Size (px)</label>
                    <div className={styles.dimensionInputs}>
                        <input type="number" value={outputWidth} onChange={e => setOutputWidth(parseInt(e.target.value) || 0)} className={`${globalStyles.inputField} ${styles.dimensionInput}`} />
                        <span>x</span>
                        <input type="number" value={outputHeight} onChange={e => setOutputHeight(parseInt(e.target.value) || 0)} className={`${globalStyles.inputField} ${styles.dimensionInput}`} />
                        <label className={styles.aspectLock}>
                            <input type="checkbox" checked={keepAspectRatio} onChange={(e) => setKeepAspectRatio(e.target.checked)} />Lock
                        </label>
                    </div>
                </div>
                <div className={globalStyles.inputColumn}>
                    <label className={globalStyles.label}>File name</label>
                    <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} className={globalStyles.inputField} />
                </div>
                <div className={globalStyles.inputColumn}>
                    <label className={globalStyles.label}> </label>
                    <button onClick={handleDownload} className={globalStyles.actionButton}>Download</button>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.cropperColumn}>
                    {imgSrc ? (
                        <div className={styles.cropWrapper}>
                            <ReactCrop
                                crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}
                                aspect={keepAspectRatio && outputHeight > 0 ? (outputWidth/outputHeight) : undefined}
                            >
                                <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
                            </ReactCrop>
                        </div>
                    ) : <p>No image loaded. Please upload one using the area above.</p>
                    }
                </div>
                <div className={styles.previewsColumn}>
                    <div className={styles.previewBox}>
                        <label className={`${globalStyles.label} ${styles.label}`}>Cropped Preview</label>
                        {croppedPreviewUrl && <img alt="Cropped preview" src={croppedPreviewUrl} className={globalStyles.imagePreview} />}
                    </div>
                    <div className={styles.previewBox}>
                        <label className={`${globalStyles.label} ${styles.label}`}>Dithered Preview</label>
                        <canvas ref={ditheredCanvasRef} className={`${globalStyles.imagePreview} ${styles.pixelatedPreview}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
