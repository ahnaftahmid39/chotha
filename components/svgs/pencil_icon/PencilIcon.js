import styles from './PencilIcon.module.css';

export default function PencilIcon({ width = 16, height = 16, ...props }) {
  return (
    <>
      <svg
        className={styles['pencil-icon']}
        width={width}
        height={height}
        {...props}
        viewBox='0 0 18 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M5.76855 15.4559L15.893 5.33137C16.6918 4.53256 16.6918 3.23745 15.893 2.43865V2.43865C15.0942 1.63985 13.7991 1.63985 13.0003 2.43865L2.87584 12.5631L5.76855 15.4559Z' />
        <path d='M1.7508 16.5807L5.76845 15.4558L2.87574 12.563L1.7508 16.5807Z' />
        <path d='M1.75068 16.5808L3.94639 15.9711L2.36267 14.3874L1.75068 16.5808Z' />
      </svg>
    </>
  );
}
