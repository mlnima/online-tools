import type { Metadata } from 'next';
import Base64ToBinaryClient from './client';

export const metadata: Metadata = {
  title: "Base64 to Binary Converter | WebWizKit",
  description: "Decode Base64 encoded strings to their binary representation.",
  keywords: ["base64 to binary", "base64 decode", "data converter", "developer tools"],
};

const Base64ToBinaryPage = () => {
  return <Base64ToBinaryClient />;
};
export default Base64ToBinaryPage;
