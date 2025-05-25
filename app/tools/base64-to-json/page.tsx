import type { Metadata } from 'next';
import Base64ToJsonClient from './client';

export const metadata: Metadata = {
  title: "Base64 to JSON Converter | WebWizKit",
  description: "Decode Base64 encoded strings to JSON objects (pretty-printed).",
  keywords: ["base64 to json", "base64 decode", "data converter", "developer tools", "json decoder"],
};

const Base64ToJsonPage = () => {
  return <Base64ToJsonClient />;
};
export default Base64ToJsonPage;
