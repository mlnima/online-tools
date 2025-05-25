import type { Metadata } from 'next';
import Crc16HashGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'CRC-16 Hash Generator | WebWizKit',
  description: 'Generate CRC-16 (CCITT variant) hashes from your input text. Useful for data integrity checks. An online tool by WebWizKit.',
  keywords: ['CRC-16', 'Hash Generator', 'Checksum', 'CCITT', 'Data Integrity', 'Online Tool', 'WebWizKit']
};

const Crc16HashGeneratorPage = () => {
  return <Crc16HashGeneratorClient />;
};
export default Crc16HashGeneratorPage;
