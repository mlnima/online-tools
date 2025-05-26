import type { Metadata } from 'next';
import HtmlUnescapeClient from './client';

export const metadata: Metadata = {
  title: 'HTML Unescape | Unescape HTML Entities | WebWizKit',
  description: 'Unescape HTML entities to their original characters. Paste your escaped text to get the plain HTML version. An online tool by WebWizKit.',
  keywords: ['HTML Unescape', 'Unescape HTML', 'HTML Entities', 'Decode HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const HtmlUnescapePage = () => {
  return <HtmlUnescapeClient />;
};
export default HtmlUnescapePage;
