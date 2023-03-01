import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import styles from '../../styles/Profile.module.css';
import { dateDiff, timeDiffString } from '../../lib/utils/date';

export default function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem('token')) router.replace('/auth');
  }, []);
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className={styles['profile-container']}>
        {userInfo && (
          <div className={styles['profile']}>
            <div className={styles['photo']}></div>
            <div className={styles['name']}>Name: {userInfo.name}</div>
            <div className={styles['email']}>Email: {userInfo.email}</div>
            <div className={styles['name']}>
              Token expires in{' '}
              {timeDiffString(
                dateDiff(new Date(), new Date(userInfo.exp * 1000))
              )}
            </div>
            <button
              className={styles['btn-logout']}
              onClick={() => {
                localStorage.setItem('token', '');
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
