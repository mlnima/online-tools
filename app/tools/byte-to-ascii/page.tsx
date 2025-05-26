import type { Metadata } from 'next';
import ByteToAsciiClient from './client';

export const metadata: Metadata = {
  title: "Byte to ASCII Converter | WebWizKit",
  description: "Convert numerical byte values (0-255, space or comma separated) to ASCII text.",
  keywords: ["byte to ascii", "ascii converter", "number to text", "developer tools"],
};

const ByteToAsciiPage = () => {
  return <ByteToAsciiClient />;
};
export default ByteToAsciiPage;
