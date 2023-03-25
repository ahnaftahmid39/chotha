import Head from 'next/head';
import styles from '../../styles/About.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>About Chotha</title>
      </Head>
      <div className={styles['container']}>
        <p className={styles['about']}>
          Hi. This is just a hobby project. We wish to see it grow bigger. It is
          open source. Feel free to contribute. Check our github:{'  '}
          <a href='https://github.com/ahnaftahmid39/chotha'> Chotha </a>
        </p>
      </div>
    </div>
  );
}
