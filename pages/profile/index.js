import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import styles from '../../styles/Profile.module.css';

export default function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    if (!userInfo.user) router.replace('/auth');
  }, []);
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className={styles['profile-container']}>
        {userInfo.user && (
          <div className={styles['profile']}>
            <div className={styles['photo']}></div>
            <div className={styles['name']}>Name: {userInfo.user.name}</div>
            <div className={styles['email']}>Email: {userInfo.user.email}</div>
            <button
              className={styles['btn-logout']}
              onClick={() => {
                localStorage.setItem('user', '');
                setUserInfo({});
                router.replace('/auth');
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
