import type { Metadata } from 'next';
import HexToRgbClient from './client';

export const metadata: Metadata = {
  title: "HEX to RGB Converter | WebWizKit",
  description: "Convert HEX color codes to their RGB (Red, Green, Blue) representation.",
  keywords: ["hex to rgb", "color converter", "hex", "rgb", "developer tools", "design tools"],
};

const HexToRgbPage = () => {
  return <HexToRgbClient />;
};
export default HexToRgbPage;
