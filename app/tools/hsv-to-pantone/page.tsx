import type { Metadata } from 'next';
import React from "react";
import HsvToPantoneClient from './hsv-to-pantone-client';

export const metadata: Metadata = {
  title: "HSV to Pantone Converter | Find Closest Pantone Color",
  description: "Convert HSV color values to the closest matching Pantone color. Useful for designers and artists. Free online tool.",
};

const HsvToPantonePage = () => {
  return (
    <HsvToPantoneClient />
  );
};

export default HsvToPantonePage;
