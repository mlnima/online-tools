import type { Metadata } from 'next';
import JsonBeautifierClient from './client';

export const metadata: Metadata = {
  title: "JSON Beautifier Tool | WebWizKit",
  description: "Format and beautify your JSON data to make it readable and well-structured. Free online JSON formatter.",
  keywords: ["json beautifier", "json formatter", "json tidy", "developer tools", "data format"],
};

export default function JsonBeautifierPage() {
  return <JsonBeautifierClient />;
}
