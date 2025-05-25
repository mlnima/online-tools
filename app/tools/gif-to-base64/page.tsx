import type { Metadata } from 'next';
import GifToBase64Client from './client';

export const metadata: Metadata = {
  title: 'GIF to Base64 Converter | WebWizKit',
  description: 'Convert GIF images to Base64 encoded strings. Upload your GIF and get the Base64 data. An online tool by WebWizKit.',
  keywords: ['GIF to Base64', 'Image to Base64', 'GIF Converter', 'Base64 Encode', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const GifToBase64Page = () => {
  return <GifToBase64Client />;
};
export default GifToBase64Page;
