import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

const Toast = ({
  children,
  offsetY = '20%',
  handleClose,
  show,
  classname,
  ...props
}) => {
  return (
    show && (
      <div
        onClick={handleClose}
        style={{ '--offsetY': offsetY }}
        className={`${styles['wrapper']} ${classname}`}
        {...props}
      >
        {children}
      </div>
    )
  );
};

export default Toast;
