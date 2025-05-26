import type { Metadata } from 'next';
import Base64ToAsciiAltClient from './client';

export const metadata: Metadata = {
  title: "Base64 to ASCII (Alt) | WebWizKit",
  description: "Alternative tool to decode Base64 to ASCII.",
  keywords: ["base64 to ascii alt", "base64 decode", "text converter", "developer tools alt"],
};

const Base64ToAsciiAltPage = () => {
  return <Base64ToAsciiAltClient />;
};
export default Base64ToAsciiAltPage;
