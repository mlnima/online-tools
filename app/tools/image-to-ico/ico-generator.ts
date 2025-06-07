async function createImagePng(
    image: HTMLImageElement,
    size: number
): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return reject(new Error("Could not get canvas context."));
        }

        ctx.drawImage(image, 0, 0, size, size);

        canvas.toBlob(async (blob) => {
            if (!blob) {
                return reject(new Error(`Failed to create blob for size ${size}x${size}.`));
            }
            const buffer = await blob.arrayBuffer();
            resolve(buffer);
        }, "image/png");
    });
}

export async function createIco(
    imageFile: File,
    sizes: number[]
): Promise<ArrayBuffer> {
    const image = new Image();
    const imageUrl = URL.createObjectURL(imageFile);

    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = imageUrl;
    });

    const pngBuffers = await Promise.all(
        sizes.map(size => createImagePng(image, size))
    );

    URL.revokeObjectURL(imageUrl);

    const headerSize = 6;
    const directoryEntrySize = 16;
    const directoriesSize = directoryEntrySize * sizes.length;

    let totalSize = headerSize + directoriesSize;
    pngBuffers.forEach(buffer => {
        totalSize += buffer.byteLength;
    });

    const finalIcoBuffer = new ArrayBuffer(totalSize);
    const dataView = new DataView(finalIcoBuffer);
    const finalIcoArray = new Uint8Array(finalIcoBuffer);

    dataView.setUint16(0, 0, true);
    dataView.setUint16(2, 1, true);
    dataView.setUint16(4, sizes.length, true);

    let dataOffset = headerSize + directoriesSize;
    let entryOffset = headerSize;

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const pngBuffer = pngBuffers[i];
        const imageWidth = size === 256 ? 0 : size;
        const imageHeight = size === 256 ? 0 : size;

        dataView.setUint8(entryOffset, imageWidth);
        dataView.setUint8(entryOffset + 1, imageHeight);
        dataView.setUint8(entryOffset + 2, 0);
        dataView.setUint8(entryOffset + 3, 0);
        dataView.setUint16(entryOffset + 4, 1, true);
        dataView.setUint16(entryOffset + 6, 32, true);
        dataView.setUint32(entryOffset + 8, pngBuffer.byteLength, true);
        dataView.setUint32(entryOffset + 12, dataOffset, true);

        finalIcoArray.set(new Uint8Array(pngBuffer), dataOffset);

        entryOffset += directoryEntrySize;
        dataOffset += pngBuffer.byteLength;
    }

    return finalIcoBuffer;
}