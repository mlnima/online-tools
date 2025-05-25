import type { Metadata } from 'next';
import CssBeautifierClient from './client';

export const metadata: Metadata = {
  title: "CSS Beautifier Tool | WebWizKit",
  description: "Format and beautify your CSS code to make it readable and well-structured. Free online CSS formatter.",
  keywords: ["css beautifier", "css formatter", "css tidy", "developer tools", "web development"],
};

export default function CssBeautifierPage() {
  return <CssBeautifierClient />;
}
