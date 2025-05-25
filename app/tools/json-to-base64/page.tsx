import type { Metadata } from 'next';
import JsonToBase64Client from './client';

export const metadata: Metadata = {
  title: "JSON to Base64 Encoder | WebWizKit",
  description: "Encode JSON data or objects into Base64 format.",
  keywords: ["json to base64", "base64 encode json", "json tools", "developer tools", "data encoding"],
};

const JsonToBase64Page = () => {
  return <JsonToBase64Client />;
};
export default JsonToBase64Page;
