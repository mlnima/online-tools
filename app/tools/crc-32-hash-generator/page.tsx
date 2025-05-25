import type { Metadata } from 'next';
import Crc32HashGeneratorClient from './client';

export const metadata: Metadata = {
  title: "CRC-32 Hash Generator | WebWizKit",
  description: "Generate CRC-32 (IEEE 802.3) hashes from your input text for data integrity checks.",
  keywords: ["crc-32", "hash generator", "checksum", "ieee 802.3", "data integrity", "online tool"],
};

const Crc32HashGeneratorPage = () => {
  return <Crc32HashGeneratorClient />;
};
export default Crc32HashGeneratorPage;
