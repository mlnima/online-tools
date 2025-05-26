import type { Metadata } from 'next';
import Base64EncodeClient from './client';

export const metadata: Metadata = {
  title: "Base64 Encode Online | WebWizKit",
  description: "Encode text or data into Base64 format using this free online tool.",
  keywords: ["base64 encode", "text to base64", "data encoding", "developer tools"],
};

const Base64EncodePage = () => {
  return <Base64EncodeClient />;
};
export default Base64EncodePage;
