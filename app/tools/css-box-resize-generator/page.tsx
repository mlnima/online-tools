import type { Metadata } from 'next';
import CssBoxResizeGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'CSS Box Resize Generator | WebWizKit',
  description: 'Generate CSS for the `resize` property. Adjust box dimensions, preview the resizable box, and copy the CSS code. An online tool by WebWizKit.',
  keywords: ['CSS', 'Box Resize', 'resize', 'CSS Generator', 'Web Design', 'Layout Tool', 'Online Tool', 'WebWizKit']
};

const CssBoxResizeGeneratorPage = () => {
  return <CssBoxResizeGeneratorClient />;
};
export default CssBoxResizeGeneratorPage;
