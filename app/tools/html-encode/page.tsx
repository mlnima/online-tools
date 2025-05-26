import type { Metadata } from 'next';
import HtmlEncodeClient from './client';

export const metadata: Metadata = {
  title: 'HTML Encode | HTML Entity Encoder | WebWizKit',
  description: 'Encode special HTML characters to their corresponding entities. Paste your HTML to get the escaped version. An online tool by WebWizKit.',
  keywords: ['HTML Encode', 'HTML Entity Encoder', 'Escape HTML', 'HTML Parser', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const HtmlEncodePage = () => {
  return <HtmlEncodeClient />;
};
export default HtmlEncodePage;
