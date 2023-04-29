import styles from './EditIcon.module.css';

const AdjustIcon = ({ size = 20 }) => {
  return (
    <svg
      className={styles['edit-icon']}
      width={size}
      height={size}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21 10.5L10 10.5' />
      <path d='M0 10.5L5 10.5' />
      <circle
        cx='7.5'
        cy='10.5'
        r='2.5'
        transform='rotate(-180 7.5 10.5)'
      />
      <path d='M0 3.5L11 3.5' />
      <path d='M21 3.5L16 3.5' />
      <circle cx='13.5' cy='3.5' r='2.5' />
      <path d='M0 17.5H11' />
      <path d='M21 17.5L16 17.5' />
      <circle cx='13.5' cy='17.5' r='2.5' />
    </svg>
  );
};

export default AdjustIcon;
