import type { Metadata } from 'next';
import HexToCmykClient from './client';

export const metadata: Metadata = {
  title: "HEX to CMYK Converter | WebWizKit",
  description: "Convert HEX color codes to their CMYK (Cyan, Magenta, Yellow, Key/Black) equivalent.",
  keywords: ["hex to cmyk", "color converter", "hex", "cmyk", "developer tools", "design tools"],
};

const HexToCmykPage = () => {
  return <HexToCmykClient />;
};
export default HexToCmykPage;
