import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ProfilePlaceholder from '../../../components/svgs/ProfilePlaceholder';
import profileStyles from '../../../styles/Profile.module.css';
import styles from '../../../styles/users/UserId.module.css';

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
      <div className={profileStyles['profile-container']}>
        {user && (
          <>
            <div className={profileStyles['profile']}>
              <div className={profileStyles['profile-photo']}>
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
              <div className={profileStyles['profile-description']}>
                <div className={profileStyles['name']}>{user?.name}</div>
                <div className={profileStyles['bio']}>{user?.bio}</div>
                {user && (
                  <>
                    <div className={profileStyles['contact']}>Contact</div>
                    {user.phone && (
                      <div>
                        <div className={profileStyles['phone']}>Phone</div>
                        <div className={profileStyles['phone-value']}>
                          Phone
                        </div>
                      </div>
                    )}
                    <div>
                      <div className={profileStyles['email']}>Email</div>
                      <div className={profileStyles['email-value']}>
                        {user.email}
                      </div>
                    </div>
                    {user.socials && (
                      <>
                        <div className={profileStyles['socials']}>Socials</div>
                        {user.socials.facebook && (
                          <div className={profileStyles['social-link']}>
                            <div className={profileStyles['social-title']}>
                              Facebook
                            </div>
                            <a className='anchor' href={user.socials.facebook}>
                              {user.socials.facebook}
                            </a>
                          </div>
                        )}
                        {user.socials.twitter && (
                          <div className={profileStyles['social-link']}>
                            <div className={profileStyles['social-title']}>
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
            <div className={profileStyles['all-posts']}>
              <div className={profileStyles['all-posts-title']}>All Posts</div>
              {posts?.length > 0 ? (
                posts.map((post) => {
                  return (
                    <div className={styles['wrapper']}>
                      <div className={styles['title']}>{post.title}</div>
                      <div className={styles['description']}>
                        {post.description}
                      </div>
                      <div className={styles['date-view-wrapper']}>
                        <div className={styles['date']}>
                          {new Date(post.createdAt).toDateString()}
                        </div>
                        <Link
                          key={post._id}
                          passHref
                          href={`/posts/${post._id}`}
                        >
                          <a className={styles['btn-view']}>View</a>
                        </Link>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles['tags']}>
                          {post.tags.map((tag, idx) => {
                            <div className={styles['tag']} key={idx}>
                              {tag}
                            </div>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div>This author does not have any post yet</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
