import type { Metadata } from 'next';
import ImageToIcoClient from './client';

export const metadata: Metadata = {
    title: "Image to ICO Converter | WebWizKit",
    description: "Convert any image (PNG, JPG) to a .ico file for your website's favicon. Select multiple sizes and download instantly.",
    keywords: ["image to ico", "png to ico", "jpg to ico", "ico converter", "favicon generator", "developer tools"],
};

export default function ImageToIcoPage() {
    return <ImageToIcoClient />;
}