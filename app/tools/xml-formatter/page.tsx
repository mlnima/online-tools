import type { Metadata } from 'next';
import styles from "../../styles/UnifiedToolPage.module.scss";
import XmlFormatterClient from './client';

export const metadata: Metadata = {
    title: 'XML Formatter | Free & Simple Online Tool',
    description: 'Easily format, beautify, and indent your XML data with our free online tool. Paste your raw XML and get a clean, readable, and pretty-printed output instantly.',
    keywords: ['xml formatter', 'xml beautifier', 'format xml', 'pretty print xml', 'xml validator', 'online xml tool', 'xml indent'],
};

export default function XmlFormatterPage() {
    return (
        <div className={styles.toolPage}>
            <XmlFormatterClient />
        </div>
    );
}


// "use client";
// import React, {useState} from "react";
// import styles from "../../styles/UnifiedToolPage.module.scss";
//
// export default function XmlFormatter() {
//     const [input, setInput] = useState("");
//     const [output, setOutput] = useState("");
//     const [error, setError] = useState("");
//
//     function formatXml(xml: string) {
//         // Basic pretty-print for XML
//         let formatted = '';
//         const reg = /(>)(<)(\/*)/g;
//         xml = xml.replace(reg, '$1\n$2$3');
//         let pad = 0;
//         xml.split('\n').forEach((node) => {
//             let indent = 0;
//             if (node.match(/.+<\/.+>$/)) {
//                 indent = 0;
//             } else if (node.match(/^<\//)) {
//                 if (pad !== 0) pad -= 2;
//             } else if (node.match(/^<([^!?]+)>$/)) {
//                 indent = 2;
//             } else {
//                 indent = 0;
//             }
//             formatted += ' '.repeat(pad) + node + '\n';
//             pad += indent;
//         });
//         return formatted.trim();
//     }
//
//     function handleFormat() {
//         setError("");
//         try {
//             const formatted = formatXml(input);
//             setOutput(formatted);
//         } catch (e) {
//             setError("Error formatting XML.");
//             setOutput("");
//         }
//     }
//
//     return (
//         <div className={styles.toolPage}>
//             <h1>XML Formatter</h1>
//             <div className={styles.formRow}>
//                 <div className={styles.inputColumn}>
//                       <textarea
//                           value={input}
//                           onChange={e => setInput(e.target.value)}
//                           rows={8}
//                           placeholder="Paste XML here..."
//                           className={styles.inputArea}
//                       />
//                 </div>
//                 <div className={styles.inputColumn}>
//                     <textarea
//                         value={output}
//                         readOnly
//                         rows={8}
//                         placeholder="Formatted XML output..."
//                         className={styles.outputArea}
//                     />
//                 </div>
//             </div>
//             {error && <div className={styles.error}>{error}</div>}
//             <div className={styles.buttonRow}>
//                 <button onClick={handleFormat} className={styles.actionButton}>Format</button>
//             </div>
//         </div>
//     );
// }
