import type { Metadata } from 'next';
import CmykToRgbClient from './client';

export const metadata: Metadata = {
  title: "CMYK to RGB Converter | WebWizKit",
  description: "Convert CMYK color values to their RGB (Red, Green, Blue) representation.",
  keywords: ["cmyk to rgb", "color converter", "cmyk", "rgb", "developer tools", "design tools"],
};

const CmykToRgbPage = () => {
  return <CmykToRgbClient />;
};
export default CmykToRgbPage;
