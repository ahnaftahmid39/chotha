import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/cards/post_card/PostCard';
import Loading from '../components/loading_indicator/Loading';
import { getAllPostsWithoutMarkdown } from '../lib/controllers/post';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  const [leaving, setLeaving] = useState(false);

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

export const getStaticProps = async () => {
  const posts = await getAllPostsWithoutMarkdown();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
