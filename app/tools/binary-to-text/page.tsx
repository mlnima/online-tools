import type { Metadata } from 'next';
import BinaryToTextClient from './client';

export const metadata: Metadata = {
  title: "Binary to Text Converter | WebWizKit",
  description: "Convert binary code (8-bit values separated by spaces) into readable text.",
  keywords: ["binary to text", "binary decoder", "text converter", "developer tools"],
};

const BinaryToTextPage = () => {
  return <BinaryToTextClient />;
};
export default BinaryToTextPage;
