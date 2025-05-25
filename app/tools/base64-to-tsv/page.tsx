import type { Metadata } from 'next';
import Base64ToTsvClient from './client';

export const metadata: Metadata = {
  title: "Base64 to TSV Converter | WebWizKit",
  description: "Decode Base64 encoded strings to TSV (Tab Separated Values) format.",
  keywords: ["base64 to tsv", "base64 decode", "data converter", "developer tools", "tsv converter"],
};

const Base64ToTsvPage = () => {
  return <Base64ToTsvClient />;
};
export default Base64ToTsvPage;
