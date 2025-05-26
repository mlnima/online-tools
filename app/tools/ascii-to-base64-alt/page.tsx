import type { Metadata } from 'next';
import AsciiToBase64AltClient from './client';

export const metadata: Metadata = {
  title: "ASCII to Base64 (Alt) | WebWizKit",
  description: "Alternative online tool to convert ASCII text to Base64 encoding.",
  keywords: ["ascii to base64 alt", "base64 encode", "text converter", "developer tools"],
};

const ASCIIToBase64AltPage = () => {
  return <AsciiToBase64AltClient />;
};
export default ASCIIToBase64AltPage;
