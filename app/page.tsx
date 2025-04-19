import Link from "next/link";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./styles/Home.module.scss";
import { tools } from "./toolsList";

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
