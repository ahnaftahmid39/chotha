import Link from 'next/link';
import { forwardRef } from 'react';

import DateIcon from '../../svgs/date_icon/DateIcon';
import PencilIcon from '../../svgs/pencil_icon/PencilIcon';
import styles from './PostCard.module.css';

const PostCard = forwardRef(({ post, onClick, href }, ref) => {
  const { title, user, description, createdAt, tags } = post;
  return (
    <a
      onClick={onClick}
      href={href}
      ref={ref}
      role='anchor'
      className={`${styles['card']}`}
    >
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['description']}>{description}</div>
      <div className={styles['meta']}>
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

        <div className={styles['time-wrapper']}>
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
        </div>
      </div>
      {tags?.length > 0 && (
        <div className={styles['tags-wrapper']}>
          {tags.map((tag, idx) => {
            return (
              <div className={styles['tag']} key={idx}>
                {tag}
              </div>
            );
          })}
        </div>
      )}
    </a>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;
