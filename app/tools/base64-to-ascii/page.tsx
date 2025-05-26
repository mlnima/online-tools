import type { Metadata } from 'next';
import Base64ToAsciiClient from './client';

export const metadata: Metadata = {
  title: "Base64 to ASCII Converter | WebWizKit",
  description: "Decode Base64 encoded strings to plain ASCII text.",
  keywords: ["base64 to ascii", "base64 decode", "text converter", "developer tools"],
};

const Base64ToAsciiPage = () => {
  return <Base64ToAsciiClient />;
};
export default Base64ToAsciiPage;
