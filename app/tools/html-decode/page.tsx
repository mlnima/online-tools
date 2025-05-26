import type { Metadata } from 'next';
import HtmlDecodeClient from './client';

export const metadata: Metadata = {
  title: 'HTML Decode | HTML Entity Decoder | WebWizKit',
  description: 'Decode HTML entities to their original characters. Paste your encoded HTML to get the plain text version. An online tool by WebWizKit.',
  keywords: ['HTML Decode', 'HTML Entity Decoder', 'Unescape HTML', 'HTML Parser', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const HtmlDecodePage = () => {
  return <HtmlDecodeClient />;
};
export default HtmlDecodePage;
