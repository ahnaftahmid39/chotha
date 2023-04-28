import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

import ThemeSwitchButton from '../buttons/theme_switch_button/ThemeSwitchButton';
import AuthButton from '../buttons/auth_button/AuthButton';
import Logo from '../svgs/Logo';
import Hamburger from './Hamburger';
const Navbar = ({}) => {
  const router = useRouter();
  const links = [
    router.pathname != '/' && (
      <Link key='/' href={'/'} passHref>
        <a title={'Home'}>Home</a>
      </Link>
    ),
    router.pathname != '/browse' && (
      <Link key='/browse' href={'/browse'} passHref>
        <a title={'Browse'}>Browse</a>
      </Link>
    ),
    router.pathname != '/about' && (
      <Link key='/about' href={'/about'} passHref>
        <a title={'About'}>About</a>
      </Link>
    ),
    router.pathname != '/new-chotha' && (
      <Link key='/new' href={'/new-chotha'} passHref>
        <a title={'New Chotha'}>New</a>
      </Link>
    ),
  ];
  return (
    <nav className={styles['navbar-container']}>
      <div className={styles['branding']}>
        <Logo width={28} height={28} />
        <div className={styles['branding-text']}>Chotha</div>
      </div>
      <Hamburger links={links} />
      <div className={styles['links']}>{links}</div>
      <ThemeSwitchButton />
      <AuthButton />
    </nav>
  );
};

export default Navbar;
