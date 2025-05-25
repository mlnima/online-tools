import type { Metadata } from 'next';
import Base64DecodeClient from './client';

export const metadata: Metadata = {
  title: "Base64 Decode Tool | WebWizKit",
  description: "Decode Base64 strings to their original format quickly and easily with this free online tool.",
  keywords: ["base64 decode", "base64 to text", "data conversion", "developer tools"],
};

export default function Base64DecodePage() {
  return <Base64DecodeClient />;
}
