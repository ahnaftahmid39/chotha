import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './AuthButton.module.css';

const AuthButton = ({ ...props }) => {
  const [user, setUser] = useState(null);
  const [btnInfo, setBtnInfo] = useState({ link: '/auth', btnName: 'Login' });

  useEffect(() => {
    let lsuser = JSON.parse(localStorage.getItem('user'));
    if (lsuser) {
      setBtnInfo({ link: '/profile', btnName: lsuser.name });
      setUser(lsuser);
    }
  }, []);

  return (
    <div {...props} className={styles['auth-btn']}>
      <Link href={btnInfo.link} passHref>
        <a title={btnInfo.btnName}>{btnInfo.btnName}</a>
      </Link>
    </div>
  );
};

export default AuthButton;
