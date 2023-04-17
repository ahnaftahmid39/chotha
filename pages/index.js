import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import PostCard from '../components/cards/post_card/PostCard';
import Loading from '../components/loading_indicator/Loading';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/search/SearchBar';
import {
  emptyTemporaryPosts,
  getTemporaryPosts,
  savePostsTemporarily,
} from '../lib/ls/localStorage';
import LoadingCard from '../components/loading_indicator/LoadingCard';

export default function Home({}) {
  const [leaving, setLeaving] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [posts, setPosts] = useState();

  const fetchAllPosts = useCallback(async () => {
    setIsloading(true);
    try {
      const tempPosts = getTemporaryPosts();
      if (!!tempPosts) {
        setPosts(tempPosts);
      } else {
        const res = await fetch('/api/post', { method: 'GET', headers: {} });
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.error);
        } else {
          setPosts(data.posts);
          savePostsTemporarily(data.posts);
        }
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsloading(false);
    }
  }, []);

  const handleTabClosing = () => {
    emptyTemporaryPosts();
  };

  useEffect(() => {
    window.addEventListener('unload', handleTabClosing);
    fetchAllPosts();
    return () => {
      emptyTemporaryPosts();
      window.removeEventListener('unload', handleTabClosing);
    };
  }, []);

  if (leaving)
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
        <Loading />
      </div>
    );

  const handleSearch = async (text) => {
    setIsloading(true);
    if (!text || text == '') return;
    try {
      const res = await fetch('/api/post/filter', {
        method: 'POST',
        body: JSON.stringify({
          search: text,
          sortBy: 'relevance',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.status != 200) {
        throw data.error;
      } else {
        setPosts(data.posts);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const handleEmptyInput = () => {
    fetchAllPosts();
  };

  return (
    <>
      <Head>
        <title>Chotha Home page</title>
      </Head>
      <div className={`main ${styles['container']}`}>
        <main
          style={{
            marginTop: '1rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SearchBar
            handleEmptyInput={handleEmptyInput}
            handleSearch={handleSearch}
          />
          {isLoading ? (
            <div className={styles['postcard-group']}>
              {Array.from(Array(9).keys()).map((i) => {
                return <LoadingCard key={i} />;
              })}
            </div>
          ) : (
            <div className={styles['postcard-group']}>
              {posts?.length > 0 ? (
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
                })
              ) : (
                <div style={{ fontSize: '1.2rem', margin: '1rem' }}>
                  No posts found
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
