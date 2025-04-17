import Link from "next/link";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./styles/Home.module.scss";

// Import the tools list from tools/page.tsx (duplicated here for simplicity)
const tools = [
  { name: "ASCII to Base64", slug: "ascii-to-base64", description: "Convert ASCII text to Base64 encoding." },
  { name: "ASCII to Base64 (Alt)", slug: "ascii-to-base64-alt", description: "Alternative ASCII to Base64 converter." },
  { name: "ASCII to Text", slug: "ascii-to-text", description: "Convert ASCII codes to text." },
  { name: "Audio to Base64", slug: "audio-to-base64", description: "Convert audio files to Base64." },
  { name: "Base64 Encode", slug: "base64-encode", description: "Encode text or files to Base64." },
  { name: "Base64 to ASCII", slug: "base64-to-ascii", description: "Decode Base64 to ASCII text." },
  { name: "Base64 to ASCII (Alt)", slug: "base64-to-ascii-alt", description: "Alternative Base64 to ASCII converter." },
  { name: "Base64 to Binary", slug: "base64-to-binary", description: "Decode Base64 to binary." },
  { name: "Base64 to CSS", slug: "base64-to-css", description: "Decode Base64 to CSS code." },
  { name: "Base64 to CSV", slug: "base64-to-csv", description: "Decode Base64 to CSV." },
  { name: "Base64 to Hexadecimal", slug: "base64-to-hexadecimal", description: "Decode Base64 to hexadecimal values." },
  { name: "Base64 to HTML", slug: "base64-to-html", description: "Decode Base64 to HTML code." },
  { name: "Base64 to Image", slug: "base64-to-image", description: "Decode Base64 to images." },
  { name: "Base64 to JavaScript", slug: "base64-to-javascript", description: "Decode Base64 to JavaScript code." },
  { name: "Base64 to JSON", slug: "base64-to-json", description: "Decode Base64 to JSON." },
  { name: "Base64 to Octal", slug: "base64-to-octal", description: "Decode Base64 to octal values." },
  { name: "Base64 to Text", slug: "base64-to-text", description: "Decode Base64 to plain text." },
  { name: "Base64 to TSV", slug: "base64-to-tsv", description: "Decode Base64 to TSV." },
  { name: "Base64 to XML", slug: "base64-to-xml", description: "Decode Base64 to XML." },
  { name: "Base64 to YAML", slug: "base64-to-yaml", description: "Decode Base64 to YAML." },
  { name: "Binary to Base64", slug: "binary-to-base64", description: "Convert binary to Base64." },
  { name: "BMP to Base64", slug: "bmp-to-base64", description: "Convert BMP images to Base64." },
  { name: "Byte to ASCII", slug: "byte-to-ascii", description: "Convert bytes to ASCII characters." },
  { name: "Char to ASCII", slug: "char-to-ascii", description: "Get ASCII value of a character." },
  { name: "Color Converter", slug: "color-converter", description: "Convert between HEX, RGB, HSV, and more." },
  { name: "CSS to Base64", slug: "css-to-base64", description: "Encode CSS code to Base64." },
  { name: "CSV to Base64", slug: "csv-to-base64", description: "Encode CSV to Base64." },
  { name: "Decimal to ASCII", slug: "decimal-to-ascii", description: "Convert decimal to ASCII character." },
  { name: "GIF to Base64", slug: "gif-to-base64", description: "Convert GIF images to Base64." },
  { name: "Hexadecimal to Base64", slug: "hexadecimal-to-base64", description: "Encode hexadecimal values to Base64." },
  { name: "HTML to Base64", slug: "html-to-base64", description: "Encode HTML code to Base64." },
  { name: "Image to ASCII Art", slug: "image-to-ascii-art", description: "Transform images into ASCII art." },
  { name: "Image to Base64", slug: "image-to-base64", description: "Convert images to Base64." },
  { name: "JavaScript to Base64", slug: "javascript-to-base64", description: "Encode JavaScript code to Base64." },
  { name: "JPEG to Base64", slug: "jpeg-to-base64", description: "Convert JPEG images to Base64." },
  { name: "JSON Beautifier", slug: "json-beautifier", description: "Format and beautify your JSON data." },
  { name: "JSON to Base64", slug: "json-to-base64", description: "Encode JSON to Base64." },
  { name: "MP3 to Base64", slug: "mp3-to-base64", description: "Convert MP3 files to Base64." },
  { name: "Octal to Base64", slug: "octal-to-base64", description: "Encode octal values to Base64." },
  { name: "PNG to Base64", slug: "png-to-base64", description: "Convert PNG images to Base64." },
  { name: "Random Number Generator", slug: "random-number-generator", description: "Generate random numbers easily." },
  { name: "SVG to Base64", slug: "svg-to-base64", description: "Convert SVG images to Base64." },
  { name: "Text to ASCII", slug: "text-to-ascii", description: "Convert text to ASCII codes." },
  { name: "Text to Base64", slug: "text-to-base64", description: "Encode text to Base64." },
  { name: "TSV to Base64", slug: "tsv-to-base64", description: "Encode TSV to Base64." },
  { name: "UTF8 to ASCII", slug: "utf8-to-ascii", description: "Convert UTF8 text to ASCII." },
  { name: "WebP to Base64", slug: "webp-to-base64", description: "Convert WebP images to Base64." },
  { name: "XML to Base64", slug: "xml-to-base64", description: "Encode XML to Base64." },
  { name: "YAML to Base64", slug: "yaml-to-base64", description: "Encode YAML to Base64." },
  // ...add more tools here
];

export default function HomePage() {
  return (
    <main className={styles.home}>
      <p className={styles.subtitle}>
        Free, advanced, and modern web tools for everyone. Fast, private, and SEO-friendly. Choose a tool below to get started.
      </p>
      <section className={styles.allToolsGrid}>
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className={styles.toolCard}>
            <div>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
