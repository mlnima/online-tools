import type { Metadata } from 'next';
import CssBorderRadiusGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'CSS Border Radius Generator | WebWizKit',
  description: 'Easily generate CSS for border-radius by adjusting each corner individually. Preview your changes live and copy the CSS code. An online tool by WebWizKit.',
  keywords: ['CSS', 'Border Radius', 'Generator', 'CSS Generator', 'Web Design', 'Frontend Tool', 'Online Tool', 'WebWizKit', 'Corner Radius']
};

const CssBorderRadiusGeneratorPage = () => {
  return <CssBorderRadiusGeneratorClient />;
};
export default CssBorderRadiusGeneratorPage;
