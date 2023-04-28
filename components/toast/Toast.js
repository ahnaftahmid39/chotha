import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

const Toast = ({ children, handleClose, show, classname, ...props }) => {
  return (
    show && (
      <div onClick={handleClose} className={`${styles['wrapper']} ${classname}`} {...props}>
        {children}
      </div>
    )
  );
};

export default Toast;
