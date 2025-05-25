import type { Metadata } from 'next';
import ImageToAsciiArtClient from './client';

export const metadata: Metadata = {
  title: "Image to ASCII Art Converter | WebWizKit",
  description: "Transform images into ASCII art (grayscale, 80 characters wide).",
  keywords: ["image to ascii art", "ascii art generator", "image converter", "text art", "developer tools"],
};

const ImageToAsciiArtPage = () => {
  return <ImageToAsciiArtClient />;
};
export default ImageToAsciiArtPage;
