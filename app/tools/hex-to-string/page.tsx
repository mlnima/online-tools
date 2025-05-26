import React from "react";
import HexToStringClient from "./hex-to-string-client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hex to String Converter | Online Text Tool",
  description: "Convert hexadecimal values to readable ASCII or UTF-8 strings. Free, fast, and easy-to-use online hex to text converter.",
};

const HexToStringPage = () => {
  return (
    <HexToStringClient />
  );
};

export default HexToStringPage;
