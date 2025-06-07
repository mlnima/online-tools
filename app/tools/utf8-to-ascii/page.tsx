// "use client";
import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import Utf8ToAsciiClient from './client';

export const metadata: Metadata = {
    title: 'UTF-8 to ASCII Converter | Online Text Tool',
    description: 'Easily convert UTF-8 text to plain ASCII online. Our tool replaces all non-ASCII characters with a \'?\' placeholder, ensuring compatibility with older systems.',
    keywords: ['utf8 to ascii', 'utf-8 to ascii', 'text converter', 'character converter', 'ascii tool', 'unicode to ascii', 'online converter', 'string converter'],
};

export default function Utf8ToAsciiPage() {
    return (
        <div className={styles.toolPage}>
            <Utf8ToAsciiClient />
        </div>
    );
}
// import React, { useState } from "react";
// import styles from "../../styles/UnifiedToolPage.module.scss";
//
// function utf8ToAscii(input: string): string {
//   try {
//     return Array.from(input).map(c => c.charCodeAt(0) < 128 ? c : '?').join("");
//   } catch {
//     return "Invalid input";
//   }
// }
//
// export default function UTF8ToASCII() {
//   const [utf8, setUtf8] = useState("");
//   const [ascii, setAscii] = useState("");
//
//   function handleConvert() {
//     setAscii(utf8ToAscii(utf8));
//   }
//
//   function handleCopy() {
//     if (ascii && ascii !== "Invalid input") navigator.clipboard.writeText(ascii);
//   }
//
//   return (
//     <div className={styles.toolPage}>
//       <h1>UTF8 to ASCII</h1>
//       <p>Convert UTF-8 string to ASCII (non-ASCII chars replaced with '?').</p>
//       <textarea
//         rows={4}
//         className={styles.inputArea}
//         placeholder="Paste UTF-8 string..."
//         value={utf8}
//         onChange={e => setUtf8(e.target.value)}
//       />
//       <br />
//       <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
//       <div className={styles.outputArea}>
//         <label>ASCII Output:</label>
//         <textarea
//           rows={3}
//           className={styles.outputArea}
//           value={ascii}
//           readOnly
//         />
//         <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid input"} className={styles.actionButton}>Copy</button>
//       </div>
//     </div>
//   );
// }
//
