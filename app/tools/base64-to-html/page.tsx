import type { Metadata } from 'next';
import Base64ToHtmlClient from './client';

export const metadata: Metadata = {
  title: "Base64 to HTML Converter | WebWizKit",
  description: "Decode Base64 encoded strings to HTML code.",
  keywords: ["base64 to html", "base64 decode", "data converter", "developer tools", "html decoder"],
};

const Base64ToHtmlPage = () => {
  return <Base64ToHtmlClient />;
};
export default Base64ToHtmlPage;
