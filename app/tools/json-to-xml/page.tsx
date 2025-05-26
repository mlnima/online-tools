import type { Metadata } from 'next';
import JsonToXmlClient from './client';

export const metadata: Metadata = {
  title: 'JSON to XML Converter | WebWizKit',
  description: 'Convert JSON data structures to XML format. An online data transformation tool by WebWizKit.',
  keywords: ['JSON to XML', 'JSON Converter', 'XML Converter', 'Data Transformation', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

const JsonToXmlPage = () => {
  return <JsonToXmlClient />;
};
export default JsonToXmlPage;
