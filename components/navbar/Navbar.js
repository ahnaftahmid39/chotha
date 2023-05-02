import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthButton from '../buttons/auth_button/AuthButton';
import ThemeSwitchButton from '../buttons/theme_switch_button/ThemeSwitchButton';
import Layout from '../layout/Layout';
import Logo from '../svgs/Logo';
import Hamburger from './Hamburger';
import styles from './Navbar.module.css';

const paths = [
  { path: '/', title: 'Home' },
  { path: '/tutorial', title: 'Tutorial' },
  { path: '/users', title: 'Users' },
  { path: '/browse', title: 'Browse' },
  { path: '/about', title: 'About' },
  { path: '/new-chotha', title: 'New' },
];
const Navbar = ({}) => {
  const router = useRouter();

  const links = paths.map(({ path, title }, idx) => {
    return (
      <Link key={idx} href={path} passHref>
        <a aria-selected={router.pathname == path} title={title}>
          {title}
        </a>
      </Link>
    );
  });

  return (
    <Layout wrapper='nav' className={styles['navbar-container']}>
      <Link passHref href={'/'}>
        <div className={styles['branding']}>
          <Logo width={28} height={28} />
          <div className={styles['branding-text']}>Chotha</div>
        </div>
      </Link>
      <div className={styles['links']}>{links}</div>
      <Hamburger links={links} />
      <ThemeSwitchButton />
      <AuthButton className={styles['btn-auth']} />
    </Layout>
  );
};

export default Navbar;
