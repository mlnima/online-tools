import type { Metadata } from 'next';
import BinaryToBase64Client from './client';

export const metadata: Metadata = {
  title: "Binary to Base64 Converter | WebWizKit",
  description: "Convert binary strings (8-bit, space separated) to Base64 encoding.",
  keywords: ["binary to base64", "binary encoder", "base64 encode", "developer tools"],
};

const BinaryToBase64Page = () => {
  return <BinaryToBase64Client />;
};
export default BinaryToBase64Page;
