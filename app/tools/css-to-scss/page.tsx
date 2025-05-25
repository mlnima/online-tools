import type { Metadata } from 'next';
import CssToScssClient from './client';

export const metadata: Metadata = {
  title: 'CSS to SCSS Converter | WebWizKit',
  description: 'Convert your CSS code to SCSS syntax. Since CSS is valid SCSS, this tool helps you transition or manage stylesheets with SCSS. An online tool by WebWizKit.',
  keywords: ['CSS to SCSS', 'CSS Converter', 'SCSS', 'SASS', 'CSS Preprocessor', 'Stylesheet Converter', 'Online Tool', 'WebWizKit']
};

const CssToScssPage = () => {
  return <CssToScssClient />;
};
export default CssToScssPage;
