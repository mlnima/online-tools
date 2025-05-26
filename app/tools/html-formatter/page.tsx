import type { Metadata } from 'next';
import HtmlFormatterClient from './client';

export const metadata: Metadata = {
  title: 'HTML Formatter | Pretty Print HTML | WebWizKit',
  description: 'Format and pretty-print your HTML code for better readability. An online HTML beautifier tool by WebWizKit.',
  keywords: ['HTML Formatter', 'HTML Beautifier', 'Pretty Print HTML', 'Format HTML', 'Code Formatter', 'Online Tool', 'WebWizKit']
};

const HtmlFormatterPage = () => {
  return <HtmlFormatterClient />;
};
export default HtmlFormatterPage;
