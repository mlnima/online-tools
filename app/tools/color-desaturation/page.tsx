import type { Metadata } from 'next';
import ColorDesaturationClient from './client';

export const metadata: Metadata = {
  title: "Color Desaturation Tool | WebWizKit",
  description: "Desaturate a HEX color by a specified percentage (blend with gray).",
  keywords: ["color desaturation", "desaturate color", "color tools", "hex color", "graphic design tools"],
};

const ColorDesaturationPage = () => {
  return <ColorDesaturationClient />;
};
export default ColorDesaturationPage;
