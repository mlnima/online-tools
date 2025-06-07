import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import UrlUnshortenerClient from './client';

export const metadata: Metadata = {
    title: 'URL Unshortener | Expand Short Links for Free',
    description: 'Safely expand any short URL (like bit.ly, t.co) to see the original, full destination link before clicking. Protect yourself from malicious links with our free tool.',
    keywords: ['url unshortener', 'expand url', 'url expander', 'unshorten link', 'bitly unshortener', 't.co unshortener', 'link checker', 'url redirect checker'],
};

export default function UrlUnshortenerPage() {
    return (
        <div className={styles.toolPage}>
            <UrlUnshortenerClient />
        </div>
    );
}

// "use client";
// "use client";
// import React, { useState } from "react";
// import styles from "../../styles/UnifiedToolPage.module.scss";
//
//
// export default function UrlUnshortener() {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//
//   async function handleUnshorten() {
//     setError("");
//     setOutput("");
//     setLoading(true);
//     try {
//       // Use fetch to follow redirects
//       const response = await fetch(input, { method: 'HEAD', redirect: 'follow' });
//       setOutput(response.url);
//     } catch (e) {
//       setError("Error unshortening URL (CORS or invalid URL).");
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <div className={styles.toolPage}>
//       <h1>URL Unshortener</h1>
//       <textarea
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         rows={2}
//         placeholder="Paste short URL here..."
//         className={styles.inputArea}
//       />
//       <button onClick={handleUnshorten} className={styles.actionButton} disabled={loading}>
//         {loading ? 'Unshortening...' : 'Unshorten'}
//       </button>
//       <div className={styles.warning}>
//         Note: This tool uses fetch() and may not work for all URLs due to CORS restrictions.
//       </div>
//       {error && <div className={styles.error}>{error}</div>}
//       <textarea
//         value={output}
//         readOnly
//         rows={2}
//         placeholder="Unshortened URL output..."
//         className={styles.outputArea}
//       />
//     </div>
//   );
// }
