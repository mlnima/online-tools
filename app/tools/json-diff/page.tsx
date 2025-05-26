import type { Metadata } from 'next';
import React from "react";
import JsonDiffClient from './json-diff-client';

export const metadata: Metadata = {
  title: "JSON Diff Checker | Compare Two JSON Files Online",
  description: "Easily compare two JSON objects or files and highlight the differences. Our free online JSON diff tool helps you find discrepancies quickly.",
};

const JsonDiffPage = () => {
  return (
    <JsonDiffClient />
  );
};

export default JsonDiffPage;
