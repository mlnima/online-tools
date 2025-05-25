import type { Metadata } from 'next';
import Base64ToOctalClient from './client';

export const metadata: Metadata = {
  title: "Base64 to Octal Converter | WebWizKit",
  description: "Decode Base64 encoded strings to their octal representation.",
  keywords: ["base64 to octal", "base64 decode", "data converter", "developer tools", "octal converter"],
};

const Base64ToOctalPage = () => {
  return <Base64ToOctalClient />;
};
export default Base64ToOctalPage;
