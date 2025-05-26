import type { Metadata } from 'next';
import CssBorderGeneratorClient from './client';

export const metadata: Metadata = {
  title: "CSS Border Generator | WebWizKit",
  description: "Generate CSS for borders with options for width, style, color, and radius. Preview and copy the code.",
  keywords: ["css border generator", "css border", "border style", "css generator", "web design tools"],
};

const CssBorderGeneratorPage = () => {
  return <CssBorderGeneratorClient />;
};
export default CssBorderGeneratorPage;
