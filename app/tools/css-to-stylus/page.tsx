import type { Metadata } from 'next';
import CssToStylusClient from './client';

export const metadata: Metadata = {
  title: 'CSS to Stylus Converter | WebWizKit',
  description: 'Convert your CSS code to Stylus syntax. Since CSS is valid Stylus, this tool aids in stylesheet management and conversion. An online tool by WebWizKit.',
  keywords: ['CSS to Stylus', 'CSS Converter', 'Stylus', 'CSS Preprocessor', 'Stylesheet Converter', 'Online Tool', 'WebWizKit']
};

const CssToStylusPage = () => {
  return <CssToStylusClient />;
};
export default CssToStylusPage;
