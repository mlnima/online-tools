import type { Metadata } from 'next';
import Base64ToCsvClient from './client';

export const metadata: Metadata = {
  title: "Base64 to CSV Converter | WebWizKit",
  description: "Decode Base64 encoded strings to CSV (Comma Separated Values) format.",
  keywords: ["base64 to csv", "base64 decode", "data converter", "developer tools", "csv converter"],
};

const Base64ToCsvPage = () => {
  return <Base64ToCsvClient />;
};
export default Base64ToCsvPage;
