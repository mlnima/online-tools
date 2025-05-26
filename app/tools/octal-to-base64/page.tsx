import type { Metadata } from 'next';
import React from "react"; // Added React import
import OctalToBase64Client from './octal-to-base64-client';

export const metadata: Metadata = {
  title: 'Octal to Base64 Converter | WebWizKit',
  description: 'Convert octal strings (space-separated) to Base64 encoding. An online number system and encoding tool by WebWizKit.',
  keywords: ['Octal to Base64', 'Octal Converter', 'Base64 Encode', 'Number System', 'Encoding', 'Online Tool', 'WebWizKit']
};

const OctalToBase64Page = () => {
  return (
    <OctalToBase64Client />
  );
};

export default OctalToBase64Page;
