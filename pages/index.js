import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

import Button from '../components/buttons/button/Button';
import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';

const repeatCount = 2;
const logoLight = '/images/logo-light.png';
const logoDark = '/images/logo-dark.png';
const Home = () => {
  const { resolvedTheme: theme } = useTheme();
  const counter = useRef(0);
  console.log(theme)
  return (
    <>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <Layout>
        <section className={styles['branding-section-wrapper']}>
          <div className={styles['branding-wrapper']}>
          {theme == "light" ? 
            <Image
              src={logoLight}
              alt='logo'
              width={150}
              height={148}
              objectFit='cover'
            /> 
            :
            <Image
              src={logoDark}
              alt='logo'
              width={150}
              height={148}
              objectFit='cover'
            />}
            <div className={`${styles['brand']} unselectable`}>
              <div className={styles['brand-name']}>Chotha</div>
              <TypeAnimation
                wrapper='div'
                cursor={false}
                speed={60}
                repeat={repeatCount}
                className={`${styles['brand-slogan']} ${styles['custom-type-animation-cursor']}`}
                sequence={[
                  'Learn from others',
                  3000,
                  'Share your notes',
                  3000,
                  'Help Others',
                  3000,
                  'Teach and Learn',
                  3000,
                  (el) => {
                    if (counter.current == repeatCount) {
                      el.classList.remove(
                        styles['custom-type-animation-cursor']
                      );
                    } else {
                      counter.current++;
                    }
                  },
                ]}
              />
            </div>
            <div className={styles['btn-group']}>
              <Link href={'/browse'} passHref>
                <Button buttonType='outlined' className={styles['btn']}>
                  Start Browsing
                </Button>
              </Link>
              <Link href={'/new-chotha'} passHref>
                <Button className={styles['btn']}>Write new chotha</Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
