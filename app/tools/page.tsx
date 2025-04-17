import Link from "next/link";
import styles from "../styles/Tools.module.scss";

const tools = [
  { name: "ASCII to Base64", slug: "ascii-to-base64" },
  { name: "ASCII to Base64 (Alt)", slug: "ascii-to-base64-alt" },
  { name: "ASCII to Text", slug: "ascii-to-text" },
  { name: "Audio to Base64", slug: "audio-to-base64" },
  { name: "Base64 Encode", slug: "base64-encode" },
  { name: "Base64 to ASCII", slug: "base64-to-ascii" },
  { name: "Base64 to ASCII (Alt)", slug: "base64-to-ascii-alt" },
  { name: "Base64 to Binary", slug: "base64-to-binary" },
  { name: "Base64 to CSS", slug: "base64-to-css" },
  { name: "Base64 to CSV", slug: "base64-to-csv" },
  { name: "Base64 to Hexadecimal", slug: "base64-to-hexadecimal" },
  { name: "Base64 to HTML", slug: "base64-to-html" },
  { name: "Base64 to Image", slug: "base64-to-image" },
  { name: "Base64 to JavaScript", slug: "base64-to-javascript" },
  { name: "Base64 to JSON", slug: "base64-to-json" },
  { name: "Base64 to Octal", slug: "base64-to-octal" },
  { name: "Base64 to Text", slug: "base64-to-text" },
  { name: "Base64 to TSV", slug: "base64-to-tsv" },
  { name: "Base64 to XML", slug: "base64-to-xml" },
  { name: "Base64 to YAML", slug: "base64-to-yaml" },
  { name: "Binary to Base64", slug: "binary-to-base64" },
  { name: "BMP to Base64", slug: "bmp-to-base64" },
  { name: "Byte to ASCII", slug: "byte-to-ascii" },
  { name: "Char to ASCII", slug: "char-to-ascii" },
  { name: "Color Converter", slug: "color-converter" },
  { name: "CSS to Base64", slug: "css-to-base64" },
  { name: "CSV to Base64", slug: "csv-to-base64" },
  { name: "Decimal to ASCII", slug: "decimal-to-ascii" },
  { name: "GIF to Base64", slug: "gif-to-base64" },
  { name: "Hexadecimal to Base64", slug: "hexadecimal-to-base64" },
  { name: "HTML to Base64", slug: "html-to-base64" },
  { name: "Image to ASCII Art", slug: "image-to-ascii-art" },
  { name: "Image to Base64", slug: "image-to-base64" },
  { name: "JavaScript to Base64", slug: "javascript-to-base64" },
  { name: "JPEG to Base64", slug: "jpeg-to-base64" },
  { name: "JSON Beautifier", slug: "json-beautifier" },
  { name: "JSON to Base64", slug: "json-to-base64" },
  { name: "MP3 to Base64", slug: "mp3-to-base64" },
  { name: "Octal to Base64", slug: "octal-to-base64" },
  { name: "PNG to Base64", slug: "png-to-base64" },
  { name: "Random Number Generator", slug: "random-number-generator" },
  { name: "SVG to Base64", slug: "svg-to-base64" },
  { name: "Text to ASCII", slug: "text-to-ascii" },
  { name: "Text to Base64", slug: "text-to-base64" },
  { name: "TSV to Base64", slug: "tsv-to-base64" },
  { name: "UTF8 to ASCII", slug: "utf8-to-ascii" },
  { name: "WebP to Base64", slug: "webp-to-base64" },
  { name: "XML to Base64", slug: "xml-to-base64" },
  { name: "YAML to Base64", slug: "yaml-to-base64" },
  // ...add more tools here
];

export default function ToolsPage() {
  return (
    <main className={styles.tools}>
      <h1>All Tools</h1>
      <ul className={styles.toolList}>
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
