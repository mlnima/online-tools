import type { Metadata } from 'next';
import CssBackgroundImageGeneratorClient from './client';

export const metadata: Metadata = {
  title: "CSS Background Image Generator | WebWizKit",
  description: "Generate CSS `background-image` properties with options for URL, repeat, size, and position.",
  keywords: ["css background image", "css generator", "background image", "developer tools", "web design"],
};

const CssBackgroundImageGeneratorPage = () => {
  return <CssBackgroundImageGeneratorClient />;
};
export default CssBackgroundImageGeneratorPage;
