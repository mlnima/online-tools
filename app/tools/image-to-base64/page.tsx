import type { Metadata } from 'next';
import ImageToBase64Client from './client';

export const metadata: Metadata = {
  title: "Image to Base64 Converter | WebWizKit",
  description: "Convert images (PNG, JPG, GIF, etc.) to Base64 strings. Free online tool for encoding images.",
  keywords: ["image to base64", "base64 image", "image encoder", "developer tools", "data uri"],
};

export default function ImageToBase64Page() {
  return <ImageToBase64Client />;
}
