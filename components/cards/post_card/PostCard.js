import { forwardRef } from 'react';
import styles from './PostCard.module.css';
const PostCard = forwardRef(({ post, onClick, href }, ref) => {
  const { title, user, description, createdAt } = post;
  return (
    <div className={`${styles['card']}`}>
      <a title={title} onClick={onClick} href={href} ref={ref}>
        <div className={styles['author']}>{user?.name}</div>
        <div className={styles['time']}>
          {new Date(createdAt).toLocaleDateString('en-UK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
        </div>
        <h2 className={styles['title']}>{title}</h2>
        <div className={styles['description']}>{description}</div>
      </a>
    </div>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
