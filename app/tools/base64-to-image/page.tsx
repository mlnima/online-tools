import type { Metadata } from 'next';
import Base64ToImageClient from './client';

export const metadata: Metadata = {
  title: 'Base64 to Image Converter | WebWizKit',
  description: 'Convert Base64 strings to images. Paste your Base64 data and instantly preview the decoded image. An online tool by WebWizKit.',
  keywords: ['Base64 to Image', 'Image Converter', 'Base64 Decoder', 'Online Tool', 'Developer Tools', 'WebWizKit', 'Data URI']
};

const Base64ToImagePage = () => {
  return <Base64ToImageClient />;
};
export default Base64ToImagePage;
