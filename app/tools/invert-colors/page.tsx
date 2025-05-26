import type { Metadata } from 'next';
import React from "react";
import InvertColorsClient from './invert-colors-client';

export const metadata: Metadata = {
  title: "Invert Colors | Online Color Inverter Tool",
  description: "Easily invert colors in HEX or RGB format. Our free online tool helps you find the negative of any color quickly.",
};

const InvertColorsPage = () => {
  return (
    <InvertColorsClient />
  );
};

export default InvertColorsPage;
