import type { Metadata } from 'next';
import JsonViewerClient from './client';

export const metadata: Metadata = {
  title: "JSON Viewer | WebWizKit",
  description: "View and navigate JSON data in a tree structure. Useful for inspecting complex JSON.",
  keywords: ["json viewer", "json tree", "json formatter", "developer tools", "json inspector", "view json"],
};

const JsonViewerPage = () => {
  return <JsonViewerClient />;
};
export default JsonViewerPage;
