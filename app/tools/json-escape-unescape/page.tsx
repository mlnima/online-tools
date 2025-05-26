import type { Metadata } from 'next';
import React from "react";
import JsonEscapeUnescapeClient from './json-escape-unescape-client';

export const metadata: Metadata = {
  title: "JSON Escape & Unescape Tool | Online String Utility",
  description: "Easily escape or unescape strings for use within JSON. Handles special characters, quotes, and backslashes. Free online tool.",
};

const JsonEscapeUnescapePage = () => {
  return (
    <JsonEscapeUnescapeClient />
  );
};

export default JsonEscapeUnescapePage;
