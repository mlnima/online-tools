import type { Metadata } from 'next';
import Base64ToHexadecimalClient from './client';

export const metadata: Metadata = {
  title: "Base64 to Hexadecimal Converter | WebWizKit",
  description: "Convert Base64 encoded strings to their hexadecimal representation.",
  keywords: ["base64 to hex", "base64 to hexadecimal", "base64 decode", "data converter", "developer tools"],
};

const Base64ToHexadecimalPage = () => {
  return <Base64ToHexadecimalClient />;
};
export default Base64ToHexadecimalPage;
