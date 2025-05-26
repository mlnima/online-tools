import type { Metadata } from 'next';
import HsvToRgbClient from './client';

export const metadata: Metadata = {
  title: 'HSV to RGB Converter | WebWizKit',
  description: 'Convert HSV (Hue, Saturation, Value) color values to RGB (Red, Green, Blue) format. An online color conversion tool by WebWizKit.',
  keywords: ['HSV to RGB', 'Color Converter', 'HSV', 'RGB', 'Color Model', 'Online Tool', 'WebWizKit', 'CSS Colors']
};

const HsvToRgbPage = () => {
  return <HsvToRgbClient />;
};
export default HsvToRgbPage;
