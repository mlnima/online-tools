import type { Metadata } from 'next';
import CmykToHsvClient from './client';

export const metadata: Metadata = {
  title: "CMYK to HSV Converter | WebWizKit",
  description: "Convert CMYK color values to their HSV (Hue, Saturation, Value) representation.",
  keywords: ["cmyk to hsv", "color converter", "cmyk", "hsv", "developer tools", "design tools"],
};

const CmykToHsvPage = () => {
  return <CmykToHsvClient />;
};
export default CmykToHsvPage;
