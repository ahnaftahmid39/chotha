import { useState } from 'react';

import AuthButton from '../buttons/auth_button/AuthButton';
import styles from './Hamburger.module.css';

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
      {show && (
        <div onClick={() => setShow(false)} className={styles['menu-bg']}></div>
      )}
      <div
        aria-expanded={show}
        onClick={handleMenuToggle}
        className={`${styles['menu-items']}`}
      >
        {show && (
          <>
            <AuthButton />
            {links}
          </>
        )}
      </div>
    </div>
  );
};

export default Hamburger;
