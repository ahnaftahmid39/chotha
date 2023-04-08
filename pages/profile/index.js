import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import styles from '../../styles/Profile.module.css';
import { dateDiff, timeDiffString } from '../../lib/utils/date';
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(async () => {
    if (!localStorage.getItem('token')) router.replace('/auth');
    else {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        console.log(data);
        setUser(data.user);
        setPosts(data.posts);
        if (res.status != 200) {
          console.log(data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    return () => {};
  }, []);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setUserInfo({});
    router.replace('/auth');
  };

  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className={styles['profile-container']}>
        {userInfo && (
          <>
            <div className={styles['profile']}>
              <div className={styles['profile-photo']}>
                {user?.photo ? (
                  <img
                    alt='profile picture'
                    src={user.photo}
                    width='100%'
                    height='100%'
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className={styles['profile-description']}>
                <div className={styles['name']}>{userInfo.name}</div>
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
                        <div className={styles['social']}>Socials</div>
                        {user.socials.facebook && (
                          <div>
                            <div className={styles['social-title']}>
                              Facebook
                            </div>
                            <a href={user.socials.facebook}>
                              {user.socials.facebook}
                            </a>
                          </div>
                        )}
                        {user.socials.twitter && (
                          <div>
                            <div className={styles['social-title']}>
                              Twitter
                            </div>
                            <div
                              className={styles['social-twt']}
                            >{`twitter: ${user.socials?.twitter}`}</div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                <button className={styles['btn-edit-profile']}>
                  Edit Profile
                </button>
                <button className={styles['btn-logout']} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className={styles['all-posts']}>
              <div className={styles['all-posts-title']}>All Posts</div>
              {posts?.map((post) => {
                return (
                  <div className={styles['post']} key={post._id}>
                    <Link key={post._id} passHref href={`/posts/${post._id}`}>
                      <a href={`/posts/${post._id}`}>{post.title}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
