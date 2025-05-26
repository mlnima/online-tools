import type { Metadata } from 'next';
import JpegToBase64Client from './client';

export const metadata: Metadata = {
  title: "JPEG to Base64 Converter | WebWizKit",
  description: "Convert JPEG image files to Base64 encoded strings. Supports .jpeg and .jpg formats.",
  keywords: ["jpeg to base64", "jpg to base64", "image to base64", "base64 encode", "developer tools"],
};

const JpegToBase64Page = () => {
  return <JpegToBase64Client />;
};
export default JpegToBase64Page;
