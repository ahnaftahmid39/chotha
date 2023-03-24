import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/cards/post_card/PostCard';
import Loading from '../components/loading_indicator/Loading';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    fetch('/api/post', { method: 'GET', headers: {} })
      .then((r) => {
        if (!r.ok) throw Error('Database Error!');
        return r.json();
      })
      .then((res) => {
        setPosts(res.posts);
      })
      .catch((e) => {
        console.log(e.message);
      });
    // clear storage if exists
    if (localStorage.getItem('posts') != undefined) {
      localStorage.removeItem('posts');
    }
  }, []);

  if (leaving)
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
        <Loading />
      </div>
    );
  return (
    <>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <div className={`main ${styles['container']}`}>
        <main style={{ width: '100%' }}>
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
    </>
  );
}
