import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { UserContext } from '../../providers/UserProvider';
import ls from '../../lib/ls';
import styles from '../../styles/Profile.module.css';
import ProfilePlaceholder from '../../components/svgs/ProfilePlaceholder';
import AddImageModal from '../../components/modals/add_image_modal/AddImageModal';

export default function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [edit, setEdit] = useState(false);
  const [profilePhotoUploadModalShow, setProfilePhotoUploadModalShow] =
    useState(false);

  useEffect(async () => {
    if (!ls.getToken()) router.replace('/auth');
    else {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${ls.getToken()}` },
        });
        const data = await res.json();
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
    ls.setToken('');
    setUserInfo({});
    router.replace('/auth');
  };
  const handleEditButton = () => {
    setEdit(true);
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
      <div className={styles['profile-container']}>
        {userInfo && (
          <>
            <div className={styles['profile']}>
              <div
                onClick={handleUpdateProfilePhoto}
                className={styles['profile-photo']}
              >
                {user?.photo ? (
                  <>
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
                        {user.socials.facebook && (
                          <div>
                            <div className={styles['social-title']}>
                              Facebook
                            </div>
                            <a className='anchor' href={user.socials.facebook}>
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
                <button
                  type='button'
                  className={styles['btn-edit-profile']}
                  onClick={handleEditButton}
                >
                  <span>Edit Profile</span>
                </button>
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
                posts.map((post) => {
                  return (
                    <div className={styles['post']} key={post._id}>
                      <Link key={post._id} passHref href={`/posts/${post._id}`}>
                        <a href={`/posts/${post._id}`}>{post.title}</a>
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
