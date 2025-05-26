import type { Metadata } from 'next';
import React from "react"; // Added React import for JSX
import HsvToCmykClient from './hsv-to-cmyk-client';

export const metadata: Metadata = {
  title: 'HSV to CMYK Converter | WebWizKit',
  description: 'Convert HSV (Hue, Saturation, Value) color values to CMYK (Cyan, Magenta, Yellow, Key/Black) format. An online color conversion tool by WebWizKit.',
  keywords: ['HSV to CMYK', 'Color Converter', 'HSV', 'CMYK', 'Color Model', 'Online Tool', 'WebWizKit', 'Design', 'Print']
};

const HsvToCmykPage = () => {
  return (
    <HsvToCmykClient />
  );
};

export default HsvToCmykPage;
