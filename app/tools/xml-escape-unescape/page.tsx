import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import XmlEscapeUnescapeClient from './client';

export const metadata: Metadata = {
    title: 'XML Escape & Unescape Tool | Free Online Converter',
    description: 'Quickly escape or unescape XML and HTML strings online. Convert special characters like <, >, &, \', " to their corresponding entities and back instantly.',
    keywords: ['xml escape', 'xml unescape', 'html escape', 'html unescape', 'escape xml string', 'unescape xml string', 'xml entity converter', 'string escape', 'online tool'],
};

export default function XmlEscapeUnescapePage() {
    return (
        <div className={styles.toolPage}>
            <XmlEscapeUnescapeClient />
        </div>
    );
}




// "use client";
// import React, { useState } from "react";
// import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";
//
// export default function XmlEscapeUnescape() {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [error, setError] = useState("");
//
//   function handleEscape() {
//     setError("");
//     try {
//       const escaped = input
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&apos;");
//       setOutput(escaped);
//     } catch (e) {
//       setError("Error escaping XML.");
//       setOutput("");
//     }
//   }
//
//   function handleUnescape() {
//     setError("");
//     try {
//       const unescaped = input
//         .replace(/&apos;/g, "'")
//         .replace(/&quot;/g, '"')
//         .replace(/&gt;/g, ">")
//         .replace(/&lt;/g, "<")
//         .replace(/&amp;/g, "&");
//       setOutput(unescaped);
//     } catch (e) {
//       setError("Error unescaping XML.");
//       setOutput("");
//     }
//   }
//   return (
//     <div className={unifiedToolPageStyles.toolPage}>
//       <h1>XML Escape/Unescape</h1>
//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         rows={8}
//         placeholder="Paste XML or text here..."
//         className={unifiedToolPageStyles.inputArea}
//       />
//       <div className={unifiedToolPageStyles.buttonRow}>
//         <button onClick={handleEscape} className={unifiedToolPageStyles.actionButton}>Escape</button>
//         <button onClick={handleUnescape} className={unifiedToolPageStyles.actionButton}>Unescape</button>
//       </div>
//       {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
//       <textarea
//         value={output}
//         readOnly
//         rows={8}
//         placeholder="Escaped/Unescaped output..."
//         className={unifiedToolPageStyles.outputArea}
//       />
//     </div>
//   );
// }
