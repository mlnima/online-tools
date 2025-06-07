import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import TsvToBase64Client from './client';

export const metadata: Metadata = {
    title: 'TSV to Base64 Converter | Free Online Encoder',
    description: 'Easily encode your TSV (Tab-Separated Values) data to a Base64 string online. Our tool correctly handles UTF-8 characters for a reliable and fast conversion.',
    keywords: ['tsv to base64', 'base64 encode', 'tsv encoder', 'tab separated values', 'data encoding', 'online converter', 'utf-8 to base64'],
};

export default function TsvToBase64Page() {
    return (
        <div className={styles.toolPage}>
            <TsvToBase64Client />
        </div>
    );
}
// "use client";
// import React, { useState } from "react";
// import styles from "../../styles/UnifiedToolPage.module.scss";
//
// export default function TSVToBase64() {
//   const [tsv, setTsv] = useState("");
//   const [base64, setBase64] = useState("");
//
//   function handleConvert() {
//     try {
//       const encoded = btoa(unescape(encodeURIComponent(tsv)));
//       setBase64(encoded);
//     } catch (e) {
//       setBase64("Invalid TSV input");
//     }
//   }
//
//   function handleCopy() {
//     if (base64) navigator.clipboard.writeText(base64);
//   }
//
//   return (
//     <div className={styles.toolPage}>
//       <h1>TSV to Base64</h1>
//       <p>Encode TSV text to Base64 (UTF-8 encoded).</p>
//       <textarea
//         rows={4}
//         className={styles.inputArea}
//         placeholder="Paste TSV text..."
//         value={tsv}
//         onChange={e => setTsv(e.target.value)}
//       />
//       <br />
//       <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
//       <div className={styles.outputArea}>
//         <label>Base64 Output:</label>
//         <textarea
//           rows={3}
//           className={styles.outputArea}
//           value={base64}
//           readOnly
//         />
//         <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>
//       </div>
//     </div>
//   );
// }
