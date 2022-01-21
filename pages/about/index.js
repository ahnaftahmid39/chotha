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
          {`Hi, I'm Ahnaf Tahmid, creator of chotha. This is just a hobby project.
          I wish to see it grow bigger. It is open source. Feel free to
          contribute.`}
        </p>
      </div>
    </div>
  );
}
