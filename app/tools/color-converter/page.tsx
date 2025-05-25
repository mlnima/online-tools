import type { Metadata } from 'next';
import ColorConverterClient from './client';

export const metadata: Metadata = {
  title: "Color Converter - HEX, RGB | WebWizKit",
  description: "Convert colors between formats like HEX and RGB easily. Free online color conversion tool.",
  keywords: ["color converter", "hex to rgb", "rgb to hex", "css colors", "developer tools"],
};

const ColorConverterPage = () => {
  return <ColorConverterClient />;
};
export default ColorConverterPage;
