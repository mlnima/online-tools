import type { Metadata } from 'next';
import CsvToBase64Client from './client';

export const metadata: Metadata = {
  title: "CSV to Base64 Encoder | WebWizKit",
  description: "Encode CSV (Comma Separated Values) files or text into Base64 format.",
  keywords: ["csv to base64", "base64 encode csv", "csv tools", "developer tools", "data encoding"],
};

const CsvToBase64Page = () => {
  return <CsvToBase64Client />;
};
export default CsvToBase64Page;
