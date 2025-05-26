import React from "react";
import Base64ToJavascriptAltClient from "./base64-to-javascript-alt-client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Base64 to JavaScript (Alt) Converter | Free Online Tool",
  description: "Convert Base64 encoded strings to JavaScript code (alternative method) quickly and easily with our free online tool.",
};

const Base64ToJavascriptAltPage = () => {
  return (
    <Base64ToJavascriptAltClient />
  );
};

export default Base64ToJavascriptAltPage;
