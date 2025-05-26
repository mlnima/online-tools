import type { Metadata } from 'next';
import HtmlEscapeClient from './client';

export const metadata: Metadata = {
  title: 'HTML Escape | Escape HTML Characters | WebWizKit',
  description: "Escape special HTML characters (like <, >, &, \", ') to their corresponding entities. Secure your HTML content. An online tool by WebWizKit.",
  keywords: ['HTML Escape', 'Escape HTML', 'HTML Entities', 'Security', 'Sanitize HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const HtmlEscapePage = () => {
  return <HtmlEscapeClient />;
};
export default HtmlEscapePage;
