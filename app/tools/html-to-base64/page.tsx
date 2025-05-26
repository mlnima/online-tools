import type { Metadata } from 'next';
import HtmlToBase64Client from './client';

export const metadata: Metadata = {
  title: 'HTML to Base64 Converter | WebWizKit',
  description: 'Encode your HTML code to a Base64 string (UTF-8 encoded). An online HTML to Base64 conversion tool by WebWizKit.',
  keywords: ['HTML to Base64', 'Base64 Encode', 'HTML Encoder', 'Online Tool', 'WebWizKit', 'Developer Tools', 'UTF-8']
};

const HTMLToBase64Page = () => {
  return <HtmlToBase64Client />;
};
export default HTMLToBase64Page;
