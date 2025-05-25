import type { Metadata } from 'next';
import Base64ToXmlClient from './client';

export const metadata: Metadata = {
  title: "Base64 to XML Converter | WebWizKit",
  description: "Decode Base64 encoded strings to XML (Extensible Markup Language) format.",
  keywords: ["base64 to xml", "base64 decode", "data converter", "developer tools", "xml decoder"],
};

const Base64ToXmlPage = () => {
  return <Base64ToXmlClient />;
};
export default Base64ToXmlPage;
