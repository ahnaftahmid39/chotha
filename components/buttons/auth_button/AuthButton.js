import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserProvider';
import styles from './AuthButton.module.css';

const AuthButton = ({ ...props }) => {
  let btnInfo = {};

  const { userInfo } = useContext(UserContext);
  if (Object.keys(userInfo).length > 0) {
    btnInfo.link = '/profile';
    btnInfo.btnName = userInfo.name.split(' ')[0];
  } else {
    btnInfo = { link: '/auth', btnName: 'Login' };
  }

  return (
    <Link href={btnInfo.link} passHref>
      <a {...props} className={styles['auth-btn']} title={btnInfo.btnName}>
        {btnInfo.btnName}
      </a>
    </Link>
  );
};

export default AuthButton;
