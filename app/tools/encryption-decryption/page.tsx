import type { Metadata } from 'next';
import EncryptionDecryptionClient from './client';

export const metadata: Metadata = {
  title: 'Encryption Decryption Tool | AES & XOR | WebWizKit',
  description: 'Securely encrypt or decrypt text using a password with AES-GCM (if available) or a fallback XOR method. An online tool by WebWizKit.',
  keywords: ['Encryption', 'Decryption', 'AES', 'XOR', 'Password Protection', 'Security Tool', 'Online Tool', 'WebWizKit', 'Cryptography']
};

const EncryptionDecryptionPage = () => {
  return <EncryptionDecryptionClient />;
};
export default EncryptionDecryptionPage;
