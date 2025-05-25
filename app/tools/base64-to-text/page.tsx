import type { Metadata } from 'next';
import Base64ToTextClient from './client';

export const metadata: Metadata = {
  title: "Base64 to Text Decoder | WebWizKit",
  description: "Decode Base64 encoded strings back to human-readable plain text.",
  keywords: ["base64 to text", "base64 decode", "text decoder", "developer tools", "data conversion"],
};

const Base64ToTextPage = () => {
  return <Base64ToTextClient />;
};
export default Base64ToTextPage;
