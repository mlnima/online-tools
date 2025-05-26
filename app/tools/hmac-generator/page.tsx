import type { Metadata } from 'next';
import React from "react"; // Added React import for JSX
import HmacGeneratorClient from './hmac-generator-client';
import styles from "../../styles/UnifiedToolPage.module.scss"; // This import might be unnecessary if no styles are used directly in page.tsx

export const metadata: Metadata = {
  title: 'HMAC Generator | SHA-256, SHA-1 | WebWizKit',
  description: 'Generate HMAC (Hash-based Message Authentication Code) using SHA-256 or SHA-1 algorithms with a secret key. An online security tool by WebWizKit.',
  keywords: ['HMAC Generator', 'HMAC', 'SHA-256', 'SHA-1', 'Cryptography', 'Security', 'Online Tool', 'WebWizKit', 'Message Authentication']
};

const HmacGeneratorPage = () => {
  return (
    <HmacGeneratorClient />
  );
};

export default HmacGeneratorPage;
