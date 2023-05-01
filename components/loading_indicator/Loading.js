import styles from './Loading.module.css';

const Loading = ({ size = 40, spinnerWidth = 3, className, ...props }) => {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className={`${styles['spinner-container']} ${className}`}
    >
      <div
        className={styles['spinner-background']}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderWidth: `${spinnerWidth * 0.9}px`,
        }}
      />
      <div
        className={styles['spinner']}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderWidth: `${spinnerWidth}px`,
        }}
      />
    </div>
  );
};

export default Loading;
