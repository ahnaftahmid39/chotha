import Link from 'next/link';
import { useContext } from 'react';

import { UserContext } from '../../../providers/UserProvider';
import styles from './AuthButton.module.css';

const AuthButton = ({ className, ...props }) => {
  let btnInfo = {};

  const { userInfo } = useContext(UserContext);
  if (Object.keys(userInfo).length > 0) {
    let link = '/profile';
    let btnName = userInfo.name.split(' ')[0];
    if (btnName.length > 15) {
      btnName = btnName.substring(0, 12) + '..';
    }
    btnInfo = { link, btnName };
  } else {
    btnInfo = { link: '/auth', btnName: 'Login' };
  }

  return (
    <Link href={btnInfo.link} passHref>
      <a
        {...props}
        className={`${className} ${styles['auth-btn']}`}
        title={btnInfo.btnName}
      >
        {btnInfo.btnName}
      </a>
    </Link>
  );
};

export default AuthButton;
