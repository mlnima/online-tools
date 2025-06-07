import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import StylusToCssClient from './client';

export const metadata: Metadata = {
  title: 'Stylus to CSS Converter | Free Online Tool',
  description: 'Convert Stylus preprocessor syntax to plain CSS code instantly. Our free online tool handles basic indentation and properties for quick conversions.',
  keywords: ['stylus to css', 'stylus converter', 'css preprocessor', 'convert stylus', 'online css compiler', 'stylus syntax', 'style converter'],
};

export default function StylusToCssPage() {
  return (
      <div className={styles.toolPage}>
        <StylusToCssClient />
      </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import styles from "../../styles/UnifiedToolPage.module.scss";
//
// function stylusToCss(stylus: string): string {
//   // Naive conversion: indentation to braces, add semicolons
//   let lines = stylus.split(/\r?\n/);
//   let result = [];
//   let indentStack: number[] = [];
//   let prevIndent = 0;
//   for (let i = 0; i < lines.length; i++) {
//     let line = lines[i];
//     let indent = line.match(/^\s*/)?.[0].length || 0;
//     let trimmed = line.trim();
//     if (!trimmed) continue;
//     // Close blocks if indentation decreases
//     while (indent < prevIndent) {
//       result.push('}'.repeat(indentStack.length ? 1 : 0));
//       prevIndent = indentStack.pop() ?? 0;
//     }
//     // Open block for selectors
//     if (trimmed.endsWith(':')) {
//       result.push(trimmed.replace(/:$/, ' {'));
//       indentStack.push(indent);
//       prevIndent = indent;
//       continue;
//     }
//     // Property line
//     if (trimmed.includes(' ')) {
//       let [prop, ...rest] = trimmed.split(' ');
//       let val = rest.join(' ');
//       result.push(`${prop}: ${val};`);
//     } else {
//       result.push(trimmed);
//     }
//     prevIndent = indent;
//   }
//   // Close remaining blocks
//   while (indentStack.length) {
//     result.push('}');
//     indentStack.pop();
//   }
//   return result.join('\n');
// }
//
// export default function StylusToCss() {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [error, setError] = useState("");
//
//   function handleConvert() {
//     setError("");
//     try {
//       setOutput(stylusToCss(input));
//     } catch (e) {
//       setError("Error converting Stylus to CSS.");
//     }
//   }
//
//   function handleCopy() {
//     navigator.clipboard.writeText(output);
//   }
//
//   return (
//     <div style={{ padding: 32, textAlign: "center" }}>
//       <h1>Stylus to CSS</h1>
//       <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
//         Note: This is a naive converter. Only basic indentation and property syntax are handled.
//       </div>
//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         rows={8}
//         placeholder="Paste Stylus code here..."
//         className={styles.inputArea}
//         style={{ width: '100%', marginBottom: 16 }}
//       />
//       <button onClick={handleConvert} className={styles.actionButton}  >Convert</button>
//       {error && <div className={styles.error}>{error}</div>}
//       <textarea
//         value={output}
//         readOnly
//         rows={8}
//         placeholder="CSS output..."
//         className={styles.outputArea}
//         style={{ width: '100%', marginTop: 12 }}
//       />
//       {output && (
//         <button onClick={handleCopy} className={styles.actionButton}  >Copy</button>
//       )}
//     </div>
//   );
// }
