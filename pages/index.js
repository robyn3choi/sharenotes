import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  async function createNote() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/create`, { method: 'POST' });
    const data = await res.json();
    router.push(`/note/${data.noteId}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sharenotes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <button className={styles.createButton} onClick={createNote}>
        Create a new note
      </button>
    </div>
  );
}
