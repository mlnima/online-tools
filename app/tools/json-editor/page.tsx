import type { Metadata } from 'next';
import React from "react";
import JsonEditorClient from './json-editor-client';

export const metadata: Metadata = {
  title: "Online JSON Editor | Format, Validate & Edit JSON",
  description: "Free online JSON editor to easily edit, validate, format (pretty-print), and copy your JSON data. Supports real-time validation.",
};

const JsonEditorPage = () => {
  return (
    <JsonEditorClient />
  );
};

export default JsonEditorPage;
