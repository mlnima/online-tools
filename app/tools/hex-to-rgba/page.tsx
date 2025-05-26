import React from "react";
import HexToRgbaClient from "./hex-to-rgba-client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "HEX to RGBA Converter | Online Color Tool",
  description: "Easily convert HEX color codes to RGBA format with adjustable alpha transparency. Free and simple online tool.",
};

const HexToRgbaPage = () => {
  return (
    <HexToRgbaClient />
  );
};

export default HexToRgbaPage;
