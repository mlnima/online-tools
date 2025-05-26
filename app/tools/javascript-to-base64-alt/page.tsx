import type { Metadata } from 'next';
import React from "react";
import JavascriptToBase64AltClient from './javascript-to-base64-alt-client';

export const metadata: Metadata = {
  title: "JavaScript to Base64 (Alt) Encoder | Online Tool",
  description: "Encode JavaScript code to Base64 using an alternative method. Free, secure, and easy-to-use online converter.",
};

const JavascriptToBase64AltPage = () => {
  return (
    <JavascriptToBase64AltClient />
  );
};

export default JavascriptToBase64AltPage;
