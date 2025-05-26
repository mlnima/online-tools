import type { Metadata } from 'next';
import HexToHsvClient from './client';

export const metadata: Metadata = {
  title: "HEX to HSV Converter | WebWizKit",
  description: "Convert HEX color codes to their HSV (Hue, Saturation, Value) representation.",
  keywords: ["hex to hsv", "color converter", "hex", "hsv", "developer tools", "design tools"],
};

const HexToHsvPage = () => {
  return <HexToHsvClient />;
};
export default HexToHsvPage;
