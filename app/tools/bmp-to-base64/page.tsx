import type { Metadata } from 'next';
import BmpToBase64Client from './client';

export const metadata: Metadata = {
  title: "BMP to Base64 Converter | WebWizKit",
  description: "Convert BMP (Bitmap) image files to Base64 encoded strings.",
  keywords: ["bmp to base64", "image to base64", "bmp converter", "base64 encode", "developer tools"],
};

const BmpToBase64Page = () => {
  return <BmpToBase64Client />;
};
export default BmpToBase64Page;
