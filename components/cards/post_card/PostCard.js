import { forwardRef } from 'react';
import styles from './PostCard.module.css';
import PencilIcon from '../../svgs/pencil_icon/PencilIcon';
import DateIcon from '../../svgs/date_icon/DateIcon';
const PostCard = forwardRef(({ post, onClick, href }, ref) => {
  const { title, user, description, createdAt } = post;
  return (
    <div className={`${styles['card']}`}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['meta']}>
        <div className={styles['icon']}>
          <DateIcon />
        </div>
        <div className={styles['time']}>
          {new Date(createdAt).toLocaleDateString('en-UK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
        </div>
        <div className={styles['icon']}>
          <PencilIcon />
        </div>
        <div className={styles['author']}>{user?.name}</div>
      </div>
      <div className={styles['description']}>{description}</div>
      <a
        title={title}
        href={href}
        ref={ref}
        onClick={onClick}
        className={styles['readmore']}
      >
        Read More
      </a>
    </div>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
