import type { Metadata } from 'next';
import CssValidatorClient from './client';

export const metadata: Metadata = {
  title: 'CSS Validator | W3C CSS Validation | WebWizKit',
  description: 'Validate your CSS code using the official W3C CSS Validation Service. Check for errors and ensure your stylesheets are compliant. An online tool by WebWizKit.',
  keywords: ['CSS Validator', 'W3C CSS Validation', 'CSS Check', 'Validate CSS', 'CSS Linter', 'Online Tool', 'WebWizKit', 'CSS Errors']
};

const CssValidatorPage = () => {
  return <CssValidatorClient />;
};
export default CssValidatorPage;
