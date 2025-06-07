// "use client";
import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import WordpressPasswordHashClient from './client';

export const metadata: Metadata = {
    title: 'WordPress Password Hash Generator | Free PHPass Tool',
    description: 'Create secure WordPress-compatible password hashes (PHPass) online. Simply enter a password to generate a hash suitable for direct use in a WordPress database.',
    keywords: ['wordpress password hash', 'phpass generator', 'wordpress hash', 'generate wordpress password', 'wp_hash_password', 'online hash tool', 'database password'],
};

export default function WordpressPasswordHashPage() {
    return (
        <div className={styles.toolPage}>
            <WordpressPasswordHashClient />
        </div>
    );
}
// "use client";
// import React, { useState } from "react";
// import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";
//
// export default function WordpressPasswordHash() {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [error, setError] = useState("");
//
//   // Simple JS PHPass implementation for demonstration
//   function handleHash() {
//     setError("");
//     try {
//       // This is a placeholder. In production, use a proper PHPass implementation.
//       // Here, we'll just use a basic MD5 hash for demo (not secure for real use!)
//       async function hash(str: string) {
//         // Use SHA-256 as a placeholder; Wordpress uses PHPass
//         const encoder = new TextEncoder();
//         const data = encoder.encode(str);
//         const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//       }
//       hash(input).then(setOutput);
//     } catch (e) {
//       setError("Error hashing password.");
//       setOutput("");
//     }
//   }
//   return (
//     <div className={unifiedToolPageStyles.toolPage}>
//       <h1>Wordpress Password Hash</h1>
//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         rows={2}
//         placeholder="Enter password..."
//         className={unifiedToolPageStyles.inputArea}
//
//       />
//       <button onClick={handleHash} className={unifiedToolPageStyles.actionButton}>Hash</button>
//       <div className={unifiedToolPageStyles.warning}>
//         This uses SHA-256 for demo only. Wordpress uses PHPass, which is more secure.
//       </div>
//       {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
//       <textarea
//         value={output}
//         readOnly
//         rows={2}
//         placeholder="Password hash output..."
//         className={unifiedToolPageStyles.outputArea}
//
//       />
//     </div>
//   );
// }
