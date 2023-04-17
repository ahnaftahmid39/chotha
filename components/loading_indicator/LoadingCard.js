import styles from './LoadingCard.module.css';

const LoadingCard = ({ ...props }) => {
  return (
    <div {...props} className={styles['loading-card']}>
      <div className={styles['loading-title']}> </div>
      <div className={styles['loading-author']}> </div>
      <div className={styles['loading-content']}> </div>
      <div className={styles['loading-content']}> </div>
      <div className={styles['loading-content']}> </div>
      <div className={styles['loading-content']}> </div>
    </div>
  );
};

export default LoadingCard;
