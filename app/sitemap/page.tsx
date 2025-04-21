import Link from "next/link";
import styles from "../styles/sitemap.module.scss";
import tools from "../toolsList.json";




export default function Sitemap() {
  return (
    <div style={{width: '100%', padding: '32px 12px 0 12px'}}>
      <h1>Sitemap</h1>
      <p style={{margin: '0 0 24px 0', color: 'var(--color-text-secondary)'}}>Browse all tools and converters available on this site.</p>
      <ul className={styles.sitemapGrid}>
        {tools.map(tool => (
          <li key={tool.slug}>
            <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
