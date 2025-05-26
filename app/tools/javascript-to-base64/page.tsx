import type { Metadata } from 'next';
import JavascriptToBase64Client from './client';

export const metadata: Metadata = {
  title: "JavaScript to Base64 Encoder | WebWizKit",
  description: "Encode JavaScript code snippets into Base64 format.",
  keywords: ["javascript to base64", "base64 encode javascript", "js to base64", "developer tools", "code encoding"],
};

const JavascriptToBase64Page = () => {
  return <JavascriptToBase64Client />;
};
export default JavascriptToBase64Page;
