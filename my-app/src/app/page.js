import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/basile.jpg"
          alt="Next.js logo"
          width={400}
          height={400}
          priority
        />
        <div className={styles.intro}>
          <h1>
            Você foi basilado
          </h1>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Desbasile Agora
          </a>
        </div>
      </main>
    </div>
  );
}
