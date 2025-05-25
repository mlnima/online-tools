import type { Metadata } from 'next';
import Base64ToYamlClient from './client';

export const metadata: Metadata = {
  title: "Base64 to YAML Converter | WebWizKit",
  description: "Decode Base64 encoded strings to YAML (YAML Ain't Markup Language) format.",
  keywords: ["base64 to yaml", "base64 decode", "data converter", "developer tools", "yaml decoder"],
};

const Base64ToYamlPage = () => {
  return <Base64ToYamlClient />;
};
export default Base64ToYamlPage;
