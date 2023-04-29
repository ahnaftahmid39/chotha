import React from 'react';
import styles from './ClockIcon.module.css'
const ClockIcon = ({ width = 16, height = 16 }) => {
  return (
    <>
      <svg
        className={styles['clock']}
        width={width}
        height={height}
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='16' cy='16' r='15' stroke='black' strokeWidth='2' />
        <path d='M16 6L16 16L22.5 20' stroke='black' strokeWidth='2' />
      </svg>
    </>
  );
};

export default ClockIcon;
