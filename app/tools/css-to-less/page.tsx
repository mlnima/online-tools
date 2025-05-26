import type { Metadata } from 'next';
import CssToLessClient from './client';

export const metadata: Metadata = {
  title: 'CSS to LESS Converter | WebWizKit',
  description: 'Convert your CSS code to LESS syntax. Since CSS is valid LESS, this tool helps you transition or manage stylesheets. An online tool by WebWizKit.',
  keywords: ['CSS to LESS', 'CSS Converter', 'LESS', 'CSS Preprocessor', 'Stylesheet Converter', 'Online Tool', 'WebWizKit']
};

const CssToLessPage = () => {
  return <CssToLessClient />;
};
export default CssToLessPage;
