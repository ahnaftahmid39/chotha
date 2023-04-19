import { forwardRef } from 'react';
import styles from './PostCard.module.css';
const PostCard = forwardRef(({ post, onClick, href }, ref) => {
  const { title, user, description, createdAt } = post;
  return (
    <a title={title} onClick={onClick} href={href} ref={ref}>
      <div className={`${styles['card']}`}>
        <h2 className={styles['title']}>{title}</h2>
        <div className={styles['time']}>
          {new Date(createdAt).toLocaleDateString('en-UK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
        </div>
        <div className={styles['author']}>{user?.name}</div>
        <div className={styles['description']}>{description}</div>
      </div>
    </a>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
