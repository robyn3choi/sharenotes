import Head from 'next/head';
import { useEffect, useState } from 'react';
import SocketService from 'utils/SocketService';
import styles from 'styles/Note.module.css';

export async function getServerSideProps(context) {
  const noteId = context.query.noteId;

  let initialNoteValue = '';
  try {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/?noteId=${noteId}`);
    const data = await res.json();
    initialNoteValue = data.value;
    console.log(initialNoteValue);
  } catch (err) {
    console.error(err);
  }

  // Pass data to the page via props
  return { props: { noteId, initialNoteValue } };
}

export default function Note({ noteId, initialNoteValue }) {
  const [socketService, setSocketService] = useState();
  const [noteValue, setNoteValue] = useState(initialNoteValue);

  // WebSocket is undefined when prerendering on server so initialize WebSocketServer after first render
  useEffect(() => {
    const ss = new SocketService(noteId);
    setSocketService(ss);
    ss.addMessageHandler(updateNote);
  }, []);

  function updateNote(val) {
    setNoteValue(val);
  }

  function handleNoteChange(val) {
    setNoteValue(val);
    socketService.sendMessage(val);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sharenotes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <textarea className={styles.note} onChange={(e) => handleNoteChange(e.target.value)} value={noteValue}></textarea>
    </div>
  );
}
