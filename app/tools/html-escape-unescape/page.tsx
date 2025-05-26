import type { Metadata } from 'next';
import HtmlEscapeUnescapeClient from './client';

export const metadata: Metadata = {
  title: 'HTML Escape/Unescape | WebWizKit',
  description: 'Easily escape or unescape special HTML characters to their corresponding entities or plain text. An online tool by WebWizKit.',
  keywords: ['HTML Escape', 'HTML Unescape', 'HTML Entities', 'Escape HTML', 'Unescape HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const HtmlEscapeUnescapePage = () => {
  return <HtmlEscapeUnescapeClient />;
};
export default HtmlEscapeUnescapePage;
