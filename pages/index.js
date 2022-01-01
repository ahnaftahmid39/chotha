import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
      </Head>
      <div className={styles.main}>
        <Link href="/new-chotha">New Chotha</Link>
        <textarea className = 'custom-caret'  />
        <Timer />
      </div>
    </div>
  )
}

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
const Timer = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};