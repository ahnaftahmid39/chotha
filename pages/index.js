import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BrandIcon from '../components/brand_icon/BrandIcon';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { useTheme } from 'next-themes';
const Home = () => {
  const { theme } = useTheme();
  let srcLogo = '/images/logo-light.png';
  if (theme == 'dark') srcLogo = '/images/logo-dark.png';
  return (
    <>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <div className={styles['container']}>
        <section className={styles['sec-branding']}>
          <Image
            src={srcLogo}
            alt='logo'
            width={150}
            height={148}
            objectFit='cover'
          />
          <div className={`${styles['brand']} unselectable`}>
            <div className={styles['brand-name']}>Chotha</div>
            <TypeAnimation
              wrapper='div'
              cursor={false}
              omitDeletionAnimation={true}
              speed={60}
              className={styles['brand-slogan']}
              sequence={[
                'Learn from others',
                3000,
                'Share your notes',
                3000,
                'Help Others',
                3000,
                'Teach and Learn',
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
