import type { Metadata } from 'next';
import AsciiToBase64Client from './client';

export const metadata: Metadata = {
  title: "ASCII to Base64 Converter | WebWizKit",
  description: "Convert ASCII text to Base64 encoding quickly and easily with this free online tool.",
  keywords: ["ascii to base64", "base64 encode", "text converter", "developer tools"],
};

export default function ASCIIToBase64Page() {
  return <AsciiToBase64Client />;
}
