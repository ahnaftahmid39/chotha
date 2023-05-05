import styles from './CommentSkeleton.module.css';

const CommentSkeleton = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['dp']}></div>
      <div className={styles['not-dp']}>
        <div className={styles['name']}></div>
        <div className={styles['comment']}></div>
        <div className={styles['comment']}></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
