import type { Metadata } from 'next';
import GzipDecompressOnlineClient from './client';

export const metadata: Metadata = {
  title: 'GZip Decompress Online | WebWizKit',
  description: 'Decompress GZip files or Base64 encoded GZip strings online. Fast and easy GZip unarchiver. An online tool by WebWizKit.',
  keywords: ['GZip Decompress', 'UnGzip', 'GZip Online', 'Decompress File', 'Base64 GZip', 'Online Tool', 'WebWizKit', 'Unarchiver']
};

const GzipDecompressOnlinePage = () => {
  return <GzipDecompressOnlineClient />;
};
export default GzipDecompressOnlinePage;
