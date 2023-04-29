import Head from 'next/head';
import styles from '../../styles/About.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>About Chotha</title>
      </Head>
      <div className={styles['container']}>
        <div className={styles['about']}>
          Hi. This is just a hobby project. We wish to see it grow bigger. It is
          open source. Feel free to contribute. Check our github:{'  '}
          <a
            className={'anchor'}
            href='https://github.com/ahnaftahmid39/chotha'
          >
            {' '}
            Chotha{' '}
          </a>
          <br />
          <br />
          <div>
            <strong>Technologies Used:</strong>
            <ul className={styles['lists']}>
              <li>nextjs</li>
              <li>react-markdown</li>
              <ul>
                <li>Github flavoured markdown plugin</li>
                <li>Remark math plugin</li>
                <li>Rehype KaTex</li>
              </ul>
              <li>next-themes</li>
              <li>nodemailer</li>
              <li>Imagekit.io</li>
              <li>jsonwebtoken</li>
              <li>Mongodb</li>
              <li>Mongoose</li>
              <li>Lot of CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
