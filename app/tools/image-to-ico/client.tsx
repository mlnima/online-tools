"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
import { createIco } from './ico-generator';

export default function ImageToIcoClient() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [icoUrl, setIcoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 64]);

    const availableSizes = [16, 24, 32, 48, 64, 128, 256];

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (icoUrl) URL.revokeObjectURL(icoUrl);
        };
    }, [imagePreview, icoUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageFile(null);
        if(imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        if(icoUrl) URL.revokeObjectURL(icoUrl);
        setIcoUrl(null);
        setError(null);

        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError("Please upload a valid image file (e.g., PNG, JPG).");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSizeChange = (size: number) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size].sort((a, b) => a - b)
        );
    };

    const handleConvert = async () => {
        if (!imageFile) {
            setError("Please select an image file first.");
            return;
        }
        if (selectedSizes.length === 0) {
            setError("Please select at least one size for the ICO file.");
            return;
        }

        setIsLoading(true);
        setError(null);
        if(icoUrl) URL.revokeObjectURL(icoUrl);
        setIcoUrl(null);

        try {
            const icoBuffer = await createIco(imageFile, selectedSizes);
            const blob = new Blob([icoBuffer], { type: "image/x-icon" });
            const url = URL.createObjectURL(blob);
            setIcoUrl(url);
        } catch (err) {
            const message = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(`Conversion failed. ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.toolPage}>
            <h1>Image to ICO Converter</h1>
            <p>Upload your image to convert it into a .ico file for your website favicon.</p>

            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
                    <label htmlFor="image-upload" className={styles.label}>Upload Image</label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        className={styles.inputField}
                        style={{padding: '10px', height: 'auto'}}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Selected image preview" className={styles.imagePreview} style={{ maxWidth: '300px', maxHeight: '300px' }}/>
                    )}
                </div>

                <div className={styles.inputColumn}>
                    <label className={styles.label}>Select ICO Sizes</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', width: '100%', maxWidth: '350px', margin: '0.5rem 0 2rem 0'}}>
                        {availableSizes.map(size => (
                            <label key={size} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedSizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                <span style={{ marginLeft: '0.5rem' }}>{size}x{size}</span>
                            </label>
                        ))}
                    </div>
                    {icoUrl && (
                        <div className={styles.resultContainer}>
                            <p className={styles.successText}>Conversion successful!</p>
                            <a
                                href={icoUrl}
                                download="favicon.ico"
                                className={styles.actionButton}
                            >
                                Download .ico
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttonRow}>
                <button
                    onClick={handleConvert}
                    className={styles.actionButton}
                    disabled={isLoading || !imageFile}
                >
                    {isLoading ? "Converting..." : "Convert to ICO"}
                </button>
            </div>
        </div>
    );
}