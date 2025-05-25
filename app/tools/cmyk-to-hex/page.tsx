import type { Metadata } from 'next';
import CmykToHexClient from './client';

export const metadata: Metadata = {
  title: "CMYK to HEX Converter | WebWizKit",
  description: "Convert CMYK color values to their HEX (hexadecimal) representation.",
  keywords: ["cmyk to hex", "color converter", "cmyk", "hex", "developer tools", "design tools"],
};

const CmykToHexPage = () => {
  return <CmykToHexClient />;
};
export default CmykToHexPage;
