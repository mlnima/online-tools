import type { Metadata } from 'next';
import CharToAsciiClient from './client';

export const metadata: Metadata = {
  title: "Character to ASCII Converter | WebWizKit",
  description: "Convert individual characters to their corresponding ASCII codes (space separated).",
  keywords: ["char to ascii", "character to ascii", "ascii codes", "text tools", "developer tools"],
};

const CharToAsciiPage = () => {
  return <CharToAsciiClient />;
};
export default CharToAsciiPage;
