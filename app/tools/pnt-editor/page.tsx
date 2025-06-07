import type { Metadata } from 'next';
import PntEditorClient from './client';

export const metadata: Metadata = {
    title: "PNT Image Editor and Converter | WebWizKit",
    description: "Create and convert images to the PNT format with dithering options. Upload, crop, and preview your image before downloading.",
    keywords: ["pnt editor", "pnt converter", "image dithering", "floyd-steinberg", "atkinson", "sierra", "image to pnt", "developer tools"],
};

export default function PntEditorPage() {
    return <PntEditorClient />;
}