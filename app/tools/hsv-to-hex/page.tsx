import type { Metadata } from 'next';
import HsvToHexClient from './client';

export const metadata: Metadata = {
  title: 'HSV to HEX Converter | WebWizKit',
  description: 'Convert HSV (Hue, Saturation, Value) color values to HEX (Hexadecimal) format. An online color conversion tool by WebWizKit.',
  keywords: ['HSV to HEX', 'Color Converter', 'HSV', 'HEX', 'Hexadecimal', 'Color Model', 'Online Tool', 'WebWizKit', 'CSS Colors']
};

const HsvToHexPage = () => {
  return <HsvToHexClient />;
};
export default HsvToHexPage;
