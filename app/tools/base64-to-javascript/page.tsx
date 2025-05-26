import type { Metadata } from 'next';
import Base64ToJavascriptClient from './client';

export const metadata: Metadata = {
  title: "Base64 to JavaScript Converter | WebWizKit",
  description: "Decode Base64 encoded strings to JavaScript code.",
  keywords: ["base64 to javascript", "base64 decode", "data converter", "developer tools", "javascript decoder"],
};

const Base64ToJavascriptPage = () => {
  return <Base64ToJavascriptClient />;
};
export default Base64ToJavascriptPage;
