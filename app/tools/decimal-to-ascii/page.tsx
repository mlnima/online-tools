import type { Metadata } from 'next';
import DecimalToAsciiClient from './client';

export const metadata: Metadata = {
  title: "Decimal to ASCII Converter | WebWizKit",
  description: "Convert decimal numbers (space, comma, or line separated) to their corresponding ASCII characters.",
  keywords: ["decimal to ascii", "ascii converter", "number to text", "text tools", "developer tools"],
};

const DecimalToAsciiPage = () => {
  return <DecimalToAsciiClient />;
};
export default DecimalToAsciiPage;
