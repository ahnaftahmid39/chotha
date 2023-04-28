import { useState } from 'react';
import styles from './Hamburger.module.css';
import AuthButton from '../buttons/auth_button/AuthButton';

const Hamburger = ({ links = [] }) => {
  const [show, setShow] = useState(false);
  const handleMenuToggle = () => {
    setShow(!show);
  };
  return (
    <div className={styles['menu-wrapper']}>
      <div
        onClick={handleMenuToggle}
        aria-expanded={show}
        className={styles['btn-menu-wrapper']}
      >
        <div className={styles['btn-menu']}></div>
      </div>
      <div
        aria-expanded={show}
        onClick={handleMenuToggle}
        className={`${styles['menu-items']}`}
      >
        <AuthButton />
        {links}
      </div>
    </div>
  );
};

export default Hamburger;
