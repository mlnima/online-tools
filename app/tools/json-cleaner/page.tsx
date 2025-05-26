import type { Metadata } from 'next';
import React from "react";
import JsonCleanerClient from './json-cleaner-client';

export const metadata: Metadata = {
  title: "JSON Cleaner | Online Tool to Clean and Validate JSON",
  description: "Remove comments, trailing commas, and fix other common issues in your JSON data. Free and easy-to-use online JSON cleaner.",
};

const JsonCleanerPage = () => {
  return (
    <JsonCleanerClient />
  );
};

export default JsonCleanerPage;
