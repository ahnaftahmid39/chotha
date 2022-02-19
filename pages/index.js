import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/cards/post_card/PostCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const postsFromLS = localStorage.getItem('posts');
    if (postsFromLS && postsFromLS != 'undefined') {
      setPosts(JSON.parse(postsFromLS));
    }
    fetch('/api/post', { method: 'GET', headers: {} })
      .then((r) => {
        if (!r.ok) throw Error('Database Error!');
        return r.json();
      })
      .then((res) => {
        localStorage.setItem('posts', JSON.stringify(res.posts));
        setPosts(res.posts);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const refreshPosts = () => {
    fetch('/api/post', { method: 'GET', headers: {} })
      .then((r) => r.json())
      .then((res) => {
        localStorage.setItem('posts', JSON.stringify(res.posts));
        setPosts(res.posts);
      });
  };
  if (leaving) return <div style={{ margin: '5rem' }}>Loading...</div>;
  return (
    <>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <div className={`main ${styles['container']}`}>
        <main style={{ width: '100%' }}>
          <button onClick={refreshPosts} className='btn'>
            Refresh Posts
          </button>

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
