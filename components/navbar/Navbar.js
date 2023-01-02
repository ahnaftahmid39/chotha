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
          <Link href={'/'} passHref>
            <a title={'Home'}>Home</a>
          </Link>
        )}
        {router.pathname != '/about' && (
          <Link href={'/about'} passHref>
            <a title={'About'}>About</a>
          </Link>
        )}
        {router.pathname != '/new-chotha' && (
          <Link href={'/new-chotha'} passHref>
            <a title={'New Chotha'}>New Chotha</a>
          </Link>
        )}
      </div>
      <ThemeSwitchButton/>
      <AuthButton />
    </nav>
  );
};

export default Navbar;
