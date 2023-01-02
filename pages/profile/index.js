import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Profile.module.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let lsuser = localStorage.getItem('user');
    if (lsuser) setUser(JSON.parse(lsuser));
    else router.replace('/auth');
  }, []);

  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className={styles['profile-container']}>
        {user && (
          <div className={styles['profile']}>
            <div className={styles['photo']}></div>
            <div className={styles['name']}>Name: {user.name}</div>
            <div className={styles['email']}>Email: {user.email}</div>
            <button
              className={styles['btn-logout']}
              onClick={() => {
                localStorage.setItem('user', '');
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
