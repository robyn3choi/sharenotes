import Head from 'next/head';
import styles from '../styles/Home.module.css';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://cat-fact.herokuapp.com/facts`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Sharenotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <textarea></textarea>
      </main>
    </div>
  );
}
