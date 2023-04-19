import styles from './DateIcon.module.css';

export default function DateIcon({ width = 16, height = 16, ...props }) {
  return (
    <svg
      className={styles['date-icon']}
      width={width}
      height={height}
      {...props}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='16' height='16' rx='2' />
      <line y1='3.5' x2='16' y2='3.5' strokeWidth={2}/>
      <rect x='4' y='6' width='2' height='2' rx='1' />
      <rect x='4' y='11' width='2' height='2' rx='1' />
      <rect x='9' y='6' width='2' height='2' rx='1' />
      <rect x='9' y='11' width='2' height='2' rx='1' />
    </svg>
  );
}
