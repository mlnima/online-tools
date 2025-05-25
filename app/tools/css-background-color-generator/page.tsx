import type { Metadata } from 'next';
import CssBackgroundColorGeneratorClient from './client';

export const metadata: Metadata = {
  title: "CSS Background Color Generator | WebWizKit",
  description: "Generate CSS `background-color` styles with a color picker or by inputting HEX/RGB values.",
  keywords: ["css background color", "css generator", "color picker", "developer tools", "web design"],
};

const CssBackgroundColorGeneratorPage = () => {
  return <CssBackgroundColorGeneratorClient />;
};
export default CssBackgroundColorGeneratorPage;
