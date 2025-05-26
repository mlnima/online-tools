import type { Metadata } from 'next';
import CssMinifyClient from './client';

export const metadata: Metadata = {
  title: 'CSS Minify | CSS Minifier | WebWizKit',
  description: 'Minify and compress your CSS code for faster websites. Reduce file size and improve load times with this online CSS minifier tool by WebWizKit.',
  keywords: ['CSS Minify', 'CSS Minifier', 'Compress CSS', 'Optimize CSS', 'CSS Optimizer', 'Online Tool', 'WebWizKit', 'Frontend']
};

const CssMinifyPage = () => {
  return <CssMinifyClient />;
};
export default CssMinifyPage;
