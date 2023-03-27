import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

import ThemeSwitchButton from '../buttons/theme_switch_button/ThemeSwitchButton';
import AuthButton from '../buttons/auth_button/AuthButton';
const Navbar = ({}) => {
  const router = useRouter();

  return (
    <nav className={styles['navbar-container']}>
      <div className={styles['links']}>
        {router.pathname != '/' && (
          <Link title={'Home'} href={'/'}>
            Home
          </Link>
        )}
        {router.pathname != '/about' && (
          <Link title={'About'} href={'/about'}>
            About
          </Link>
        )}
        {router.pathname != '/new-chotha' && (
          <Link title={'New Chotha'} href={'/new-chotha'}>
            New Chotha
          </Link>
        )}
      </div>
      <ThemeSwitchButton />
      <AuthButton />
    </nav>
  );
};

export default Navbar;
