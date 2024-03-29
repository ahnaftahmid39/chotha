import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import ProfilePostCard from '../../components/cards/profile_post_card/ProfilePostCard';
import AddImageModal from '../../components/modals/add_image_modal/AddImageModal';
import ProfilePlaceholder from '../../components/svgs/ProfilePlaceholder';
import ls from '../../lib/ls';
import { UserContext } from '../../providers/UserProvider';
import styles from '../../styles/Profile.module.css';
import Layout from '../../components/layout/Layout';

export default function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [profilePhotoUploadModalShow, setProfilePhotoUploadModalShow] =
    useState(false);

  useEffect(() => {
    let shouldUpdate = true;
    if (!ls.getToken()) router.replace('/auth');
    else {
      async function fetchProfile() {
        try {
          const res = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${ls.getToken()}`,
              fetchposts: true,
            },
          });
          const data = await res.json();
          if (shouldUpdate) {
            setUser(data.user);
            setPosts(data.posts);
          }
          if (res.status != 200) {
            console.log(data.message);
          }
        } catch (e) {
          console.log(e.message);
        }
      }
      fetchProfile();
    }
    return () => {
      shouldUpdate = false;
    };
  }, [router]);

  const handleLogout = () => {
    ls.setToken('');
    setUserInfo({});
    router.replace('/auth');
  };

  const handleUpdateProfilePhoto = () => {
    setProfilePhotoUploadModalShow(true);
  };

  const handleImage = async ({ url }) => {
    try {
      const res = await fetch('/api/profile', {
        body: JSON.stringify({
          photo: url,
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setProfilePhotoUploadModalShow(false);
    }
  };

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <Layout className={styles['profile-container']}>
        {userInfo && (
          <>
            <div className={styles['profile']}>
              <div
                onClick={handleUpdateProfilePhoto}
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
                    />
                  </>
                ) : (
                  <ProfilePlaceholder width={`100%`} height={`100%`} />
                )}
                <div className={styles['profile-photo-overlay']}>
                  <div>Upload New</div>
                </div>
              </div>
              <AddImageModal
                hasTitle={false}
                show={profilePhotoUploadModalShow}
                handleClose={() => {
                  setProfilePhotoUploadModalShow(false);
                }}
                handleImage={handleImage}
              />
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
                        {Object.entries(user.socials).map(([site, link]) => {
                          return (
                            <div key={site} className={styles['social-link']}>
                              <div className={styles['social-title']}>
                                {site}
                              </div>
                              <span>
                                <a
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='anchor'
                                  href={link}
                                >
                                  {link}
                                </a>
                              </span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
                <Link href={`/profile/edit`} passHref>
                  <a className={styles['btn-edit-profile']}>
                    <span>Edit Profile</span>
                  </a>
                </Link>
                <button
                  type='button'
                  className={styles['btn-logout']}
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className={styles['all-posts']}>
              <div className={styles['all-posts-title']}>All Posts</div>
              {posts?.length > 0 ? (
                posts.map((post, idx) => {
                  return <ProfilePostCard key={idx} post={post} />;
                })
              ) : (
                <div>You have no post yet</div>
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
