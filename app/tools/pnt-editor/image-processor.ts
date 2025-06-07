type KernelMatrix = { x: number; y: number; w: number }[];

const DITHER_KERNELS: Record<string, KernelMatrix> = {
    FloydSteinberg: [
        { x: 1, y: 0, w: 7 / 16 }, { x: -1, y: 1, w: 3 / 16 },
        { x: 0, y: 1, w: 5 / 16 }, { x: 1, y: 1, w: 1 / 16 },
    ],
    Stucki: [
        { x: 1, y: 0, w: 8 / 42 }, { x: 2, y: 0, w: 4 / 42 },
        { x: -2, y: 1, w: 2 / 42 }, { x: -1, y: 1, w: 4 / 42 }, { x: 0, y: 1, w: 8 / 42 }, { x: 1, y: 1, w: 4 / 42 }, { x: 2, y: 1, w: 2 / 42 },
        { x: -2, y: 2, w: 1 / 42 }, { x: -1, y: 2, w: 2 / 42 }, { x: 0, y: 2, w: 4 / 42 }, { x: 1, y: 2, w: 2 / 42 }, { x: 2, y: 2, w: 1 / 42 },
    ],
    Atkinson: [
        { x: 1, y: 0, w: 1 / 8 }, { x: 2, y: 0, w: 1 / 8 },
        { x: -1, y: 1, w: 1 / 8 }, { x: 0, y: 1, w: 1 / 8 }, { x: 1, y: 1, w: 1 / 8 },
        { x: 0, y: 2, w: 1 / 8 },
    ],
    Jarvis: [
        { x: 1, y: 0, w: 7 / 48 }, { x: 2, y: 0, w: 5 / 48 },
        { x: -2, y: 1, w: 3 / 48 }, { x: -1, y: 1, w: 5 / 48 }, { x: 0, y: 1, w: 7 / 48 }, { x: 1, y: 1, w: 5 / 48 }, { x: 2, y: 1, w: 3 / 48 },
        { x: -2, y: 2, w: 1 / 48 }, { x: -1, y: 2, w: 3 / 48 }, { x: 0, y: 2, w: 5 / 48 }, { x: 1, y: 2, w: 3 / 48 }, { x: 2, y: 2, w: 1 / 48 },
    ],
    Burkes: [
        { x: 1, y: 0, w: 8 / 32 }, { x: 2, y: 0, w: 4 / 32 },
        { x: -2, y: 1, w: 2 / 32 }, { x: -1, y: 1, w: 4 / 32 }, { x: 0, y: 1, w: 8 / 32 }, { x: 1, y: 1, w: 4 / 32 }, { x: 2, y: 1, w: 2 / 32 },
    ],
    Sierra: [
        { x: 1, y: 0, w: 5 / 32 }, { x: 2, y: 0, w: 3 / 32 },
        { x: -2, y: 1, w: 2 / 32 }, { x: -1, y: 1, w: 4 / 32 }, { x: 0, y: 1, w: 5 / 32 }, { x: 1, y: 1, w: 4 / 32 }, { x: 2, y: 1, w: 2 / 32 },
    ],
    TwoSierra: [
        { x: 1, y: 0, w: 4 / 16 }, { x: 2, y: 0, w: 3 / 16 },
        { x: -2, y: 1, w: 1 / 16 }, { x: -1, y: 1, w: 2 / 16 }, { x: 0, y: 1, w: 3 / 16 }, { x: 1, y: 1, w: 2 / 16 }, { x: 2, y: 1, w: 1 / 16 },
    ],
    SierraLite: [
        { x: 1, y: 0, w: 2 / 4 }, { x: -1, y: 1, w: 1 / 4 }, { x: 0, y: 1, w: 1 / 4 },
    ],
    FalseFloydSteinberg: [
        { x: 1, y: 0, w: 3 / 8 }, { x: 0, y: 1, w: 3 / 8 }, { x: 1, y: 1, w: 2 / 8 },
    ],
};

export const KERNEL_OPTIONS = ['Riemersma', 'Nearest', ...Object.keys(DITHER_KERNELS)];

const quantize = (val: number) => Math.round(val / 85) * 85;

function d2xy(n: number, d: number) {
    let x = 0, y = 0;
    for (let s = 1; s < n; s *= 2) {
        const rx = 1 & (d >> 1);
        const ry = 1 & (d ^ rx);
        if (ry === 0) {
            if (rx === 1) {
                x = s - 1 - x;
                y = s - 1 - y;
            }
            [x, y] = [y, x];
        }
        x += s * rx;
        y += s * ry;
        d >>= 2;
    }
    return [x, y];
}

function applyRiemersma(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    const n = Math.max(width, height);
    const error = new Float32Array(n * n * 4);

    for (let d = 0; d < n * n; d++) {
        const [x, y] = d2xy(n, d);
        if (x < width && y < height) {
            const i = (y * width + x) * 4;
            const ei = (y * n + x) * 4;

            const oldR = data[i] + error[ei];
            const oldG = data[i + 1] + error[ei + 1];
            const oldB = data[i + 2] + error[ei + 2];

            const newR = quantize(oldR);
            const newG = quantize(oldG);
            const newB = quantize(oldB);

            data[i] = newR;
            data[i + 1] = newG;
            data[i + 2] = newB;

            const errR = oldR - newR;
            const errG = oldG - newG;
            const errB = oldB - newB;

            for (let d2 = d + 1; d2 < Math.min(d + 16, n * n); d2++) {
                const [x2, y2] = d2xy(n, d2);
                const i2 = (y2 * n + x2) * 4;
                const w = (16 - (d2 - d)) / 16;
                error[i2] += errR * w;
                error[i2 + 1] += errG * w;
                error[i2 + 2] += errB * w;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyErrorDiffusion(ctx: CanvasRenderingContext2D, width: number, height: number, kernelName: string) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    const signal = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) signal[i] = data[i];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const oldR = signal[i], oldG = signal[i + 1], oldB = signal[i + 2];
            const newR = quantize(oldR), newG = quantize(oldG), newB = quantize(oldB);
            data[i] = newR; data[i + 1] = newG; data[i + 2] = newB;

            const errR = oldR - newR, errG = oldG - newG, errB = oldB - newB;
            const matrix = DITHER_KERNELS[kernelName];
            if (!matrix) continue;

            for (const k of matrix) {
                const x2 = x + k.x, y2 = y + k.y;
                if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < height) {
                    const i2 = (y2 * width + x2) * 4;
                    signal[i2] += errR * k.w;
                    signal[i2 + 1] += errG * k.w;
                    signal[i2 + 2] += errB * k.w;
                }
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}


export function applyDithering(ctx: CanvasRenderingContext2D, width: number, height: number, kernelName: string) {
    if (kernelName === 'Riemersma') {
        applyRiemersma(ctx, width, height);
    } else if (kernelName === 'Nearest') {
        const imageData = ctx.getImageData(0, 0, width, height);
        for(let i=0; i < imageData.data.length; i+=4) {
            imageData.data[i] = quantize(imageData.data[i]);
            imageData.data[i+1] = quantize(imageData.data[i+1]);
            imageData.data[i+2] = quantize(imageData.data[i+2]);
        }
        ctx.putImageData(imageData, 0, 0);
    } else {
        applyErrorDiffusion(ctx, width, height, kernelName);
    }
}
