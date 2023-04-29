import styles from './CloseButtonIcon.module.css';

const CloseButtonIcon = ({ size = 16 }) => {
  return (
    <svg
      className={styles['btn-close']}
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line x1='1.35355' y1='0.646447' x2='30.9832' y2='30.2761' />
      <line x1='1.01681' y1='30.6464' x2='30.6464' y2='1.01682' />
    </svg>
  );
};

export default CloseButtonIcon;
