import { forwardRef } from 'react';
import styles from './PostCard.module.css';
import PencilIcon from '../../svgs/pencil_icon/PencilIcon';
import ClockIcon from '../../svgs/clock_icon/ClockIcon';
import Link from 'next/link';
const PostCard = forwardRef(({ post, onClick, href }, ref) => {
  const { title, user, description, createdAt } = post;
  return (
    <div className={`${styles['card']}`}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['description']}>{description}</div>
      <div className={styles['meta']}>
        <div className={styles['time-wrapper']}>
          <div className={styles['icon']}>
            <ClockIcon />
          </div>
          <div className={styles['time']}>
            {new Date(createdAt).toLocaleDateString('en-UK', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
          </div>
        </div>
        <div className={styles['author-wrapper']}>
          <div className={styles['icon']}>
            <PencilIcon />
          </div>
          {user && (
            <Link href={`/users/${user._id}`} passHref>
              <a className={`${styles['author']}`} type='button'>
                {user?.name}
              </a>
            </Link>
          )}
        </div>
      </div>
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
