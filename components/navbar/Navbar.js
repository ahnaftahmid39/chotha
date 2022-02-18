import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { useTheme } from 'next-themes';
const Navbar = ({}) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const handleThemeChange = () => {
    if (theme != 'dark') setTheme('dark');
    else setTheme('light');
  };
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
      <div className={styles['btn-theme-change']} onClick={handleThemeChange}>
        toogle theme
      </div>
    </nav>
  );
};

export default Navbar;
