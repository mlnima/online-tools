import type { Metadata } from 'next';
import ChecksumCalculatorClient from './client';

export const metadata: Metadata = {
  title: "Checksum Calculator | WebWizKit",
  description: "Calculate a simple checksum (sum of character codes) for your input text.",
  keywords: ["checksum calculator", "checksum", "data integrity", "developer tools"],
};

const ChecksumCalculatorPage = () => {
  return <ChecksumCalculatorClient />;
};
export default ChecksumCalculatorPage;
