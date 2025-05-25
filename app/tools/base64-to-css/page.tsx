import type { Metadata } from 'next';
import Base64ToCssClient from './client';

export const metadata: Metadata = {
  title: "Base64 to CSS Converter | WebWizKit",
  description: "Convert Base64 image data to a CSS background-image property.",
  keywords: ["base64 to css", "base64 decode", "css generator", "developer tools", "data uri"],
};

const Base64ToCssPage = () => {
  return <Base64ToCssClient />;
};
export default Base64ToCssPage;
