import type { Metadata } from 'next';
import HexToPantoneClient from './client';

export const metadata: Metadata = {
  title: "HEX to Pantone Converter (Approximate) | WebWizKit",
  description: "Find the closest approximate Pantone color match for HEX color codes using a sample table.",
  keywords: ["hex to pantone", "color converter", "hex", "pantone", "developer tools", "design tools", "color match"],
};

const HexToPantonePage = () => {
  return <HexToPantoneClient />;
};
export default HexToPantonePage;
