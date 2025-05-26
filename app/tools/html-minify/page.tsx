import type { Metadata } from 'next';
import HtmlMinifyClient from './client';

export const metadata: Metadata = {
  title: 'HTML Minify | HTML Minifier | WebWizKit',
  description: 'Minify your HTML code to reduce file size and improve website performance. An online HTML minifier tool by WebWizKit.',
  keywords: ['HTML Minify', 'HTML Minifier', 'Compress HTML', 'Optimize HTML', 'Online Tool', 'WebWizKit', 'Frontend']
};

const HtmlMinifyPage = () => {
  return <HtmlMinifyClient />;
};
export default HtmlMinifyPage;
