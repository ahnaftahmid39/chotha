import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/cards/post_card/PostCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const postsFromLS = JSON.parse(localStorage.getItem('posts'));
    if (!postsFromLS) {
      fetch('/api/post', { method: 'GET', headers: {} })
        .then((r) => r.json())
        .then((res) => {
          localStorage.setItem('posts', JSON.stringify(res.posts));
          setPosts(res.posts);
        });
    } else {
      setPosts(postsFromLS);
    }
  }, []);

  const refreshPosts = ()=>{
    fetch('/api/post', { method: 'GET', headers: {} })
      .then((r) => r.json())
      .then((res) => {
        localStorage.setItem('posts', JSON.stringify(res.posts));
        setPosts(res.posts);
      });
  }
  if (leaving) return <div style={{ margin: '5rem' }}>Loading...</div>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <div className={`main`}>
        <Link href='/new-chotha' passHref>
          <a title='New Chotha' className='btn'>
            New Chotha
          </a>
        </Link>

        <Link href='/about' passHref>
          <a
            onClick={() => {
              setLeaving(true);
            }}
            title='About'
            className='btn mt-1'
          >
            About
          </a>
        </Link>
        <main>
          <button onClick={refreshPosts} className='btn mt-1'>Refresh</button>
          <div className={styles['postcard-group']}>
            {posts?.length > 0 &&
              posts.map((post) => {
                return (
                  <Link key={post._id} passHref href={`/posts/${post._id}`}>
                    <PostCard
                      post={post}
                      onClick={() => {
                        setLeaving(true);
                      }}
                    />
                  </Link>
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}
