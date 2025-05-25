import type { Metadata } from 'next';
import AsciiToTextClient from './client';

export const metadata: Metadata = {
  title: "ASCII to Text Converter | WebWizKit",
  description: "Convert ASCII codes (space, comma, or line separated) to human-readable text.",
  keywords: ["ascii to text", "text converter", "developer tools", "ascii decoder"],
};

const ASCIIToTextPage = () => {
  return <AsciiToTextClient />;
};
export default ASCIIToTextPage;
