import Head from 'next/head';
import { useEffect, useState } from 'react';
import WebSocketService from '../utils/WebSocketService';
import styles from '../styles/Home.module.css';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`http://localhost:3001`);
  // const data = await res.json();
  // Pass data to the page via props
  return { props: { initialNoteValue: 'blah' } };
}

export default function Home({ initialNoteValue }) {
  const [webSocketService, setWebSocketService] = useState();
  const [noteValue, setNoteValue] = useState(initialNoteValue);

  // WebSocket is undefined when prerendering on server so initialize WebSocketServer after first render
  useEffect(() => {
    const wss = new WebSocketService();
    setWebSocketService(wss);
    wss.addMessageHandler(updateNote);
  }, []);

  function updateNote(val) {
    setNoteValue(val);
  }

  function handleNoteChange(val) {
    setNoteValue(val);
    webSocketService.sendMessage(val);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sharenotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <textarea className={styles.note} onChange={(e) => handleNoteChange(e.target.value)} value={noteValue}></textarea>
    </div>
  );
}
