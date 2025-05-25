import type { Metadata } from 'next';
import CssBoxShadowGeneratorClient from './client';

export const metadata: Metadata = {
  title: "CSS Box Shadow Generator | WebWizKit",
  description: "Generate CSS `box-shadow` styles with controls for offsets, blur, spread, color, and inset.",
  keywords: ["css box shadow", "box shadow generator", "css generator", "developer tools", "web design"],
};

const CssBoxShadowGeneratorPage = () => {
  return <CssBoxShadowGeneratorClient />;
};
export default CssBoxShadowGeneratorPage;
