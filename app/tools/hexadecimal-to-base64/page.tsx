import type { Metadata } from 'next';
import HexadecimalToBase64Client from './client';

export const metadata: Metadata = {
  title: "Hexadecimal to Base64 Converter | WebWizKit",
  description: "Encode hexadecimal strings or values into Base64 format.",
  keywords: ["hex to base64", "hexadecimal to base64", "base64 encode", "developer tools", "data encoding"],
};

const HexadecimalToBase64Page = () => {
  return <HexadecimalToBase64Client />;
};
export default HexadecimalToBase64Page;
