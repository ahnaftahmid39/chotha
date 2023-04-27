import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { UserContext } from '../../../providers/UserProvider';
import ls from '../../../lib/ls';
import styles from '../../../styles/Profile.module.css';
import ProfilePlaceholder from '../../../components/svgs/ProfilePlaceholder';
import AddImageModal from '../../../components/modals/add_image_modal/AddImageModal';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getUserData() {
      if (!!!router.query.userId) return;
      try {
        const res = await fetch('/api/users/' + router.query.userId, {
          method: 'GET',
        });
        const data = await res.json();
        setUser(data.user);
        setPosts(data.posts);
        if (res.status != 200) {
          console.log(data.message);
        }
      } catch (e) {
        console.log(e.message || e);
      }
    }
    getUserData();
    return () => {};
  }, [router]);

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className={styles['profile-container']}>
        {user && (
          <>
            <div className={styles['profile']}>
              <div
                className={styles['profile-photo']}
              >
                {user?.photo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt='profile picture'
                      src={user.photo}
                      width='100%'
                      height='100%'
                    ></img>
                  </>
                ) : (
                  <ProfilePlaceholder width={`100%`} height={`100%`} />
                )}
              </div>
              <div className={styles['profile-description']}>
                <div className={styles['name']}>{user?.name}</div>
                <div className={styles['bio']}>{user?.bio}</div>
                {user && (
                  <>
                    <div className={styles['contact']}>Contact</div>
                    {user.phone && (
                      <div>
                        <div className={styles['phone']}>Phone</div>
                        <div className={styles['phone-value']}>Phone</div>
                      </div>
                    )}
                    <div>
                      <div className={styles['email']}>Email</div>
                      <div className={styles['email-value']}>{user.email}</div>
                    </div>
                    {user.socials && (
                      <>
                        <div className={styles['socials']}>Socials</div>
                        {user.socials.facebook && (
                          <div className={styles['social-link']}>
                            <div className={styles['social-title']}>
                              Facebook
                            </div>
                            <a className='anchor' href={user.socials.facebook}>
                              {user.socials.facebook}
                            </a>
                          </div>
                        )}
                        {user.socials.twitter && (
                          <div className={styles['social-link']}>
                            <div className={styles['social-title']}>
                              Twitter
                            </div>
                            <a className='anchor' href={user.socials.twitter}>
                              {user.socials.twitter}
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={styles['all-posts']}>
              <div className={styles['all-posts-title']}>All Posts</div>
              {posts?.length > 0 ? (
                posts.map((post) => {
                  return (
                    <div className={styles['post']} key={post._id}>
                      <Link
                        key={post._id}
                        passHref
                        href={`${user._id}/posts/${post._id}`}
                      >
                        <a href={`${user._id}/posts/${post._id}`}>
                          {post.title}
                        </a>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>You have no post yet</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
