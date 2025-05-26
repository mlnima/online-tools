import type { Metadata } from 'next';
import CmykToPantoneClient from './client';

export const metadata: Metadata = {
  title: "CMYK to Pantone Converter (Approximate) | WebWizKit",
  description: "Find the closest approximate Pantone color match for CMYK values using a sample table.",
  keywords: ["cmyk to pantone", "color converter", "cmyk", "pantone", "developer tools", "design tools", "color match"],
};

const CmykToPantonePage = () => {
  return <CmykToPantoneClient />;
};
export default CmykToPantonePage;
