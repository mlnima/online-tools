import type { Metadata } from 'next';
import CssToBase64Client from './client';

export const metadata: Metadata = {
  title: "CSS to Base64 Encoder | WebWizKit",
  description: "Encode CSS stylesheets or snippets into Base64 format.",
  keywords: ["css to base64", "base64 encode css", "css tools", "developer tools"],
};

const CssToBase64Page = () => {
  return <CssToBase64Client />;
};
export default CssToBase64Page;
