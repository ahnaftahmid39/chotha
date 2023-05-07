import Image from 'next/image';
import Link from 'next/link';

import { getDateTime } from '../../lib/utils/date';
import ProfilePlaceholder from '../svgs/ProfilePlaceholder';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  return (
    <div className={styles['comment-wrapper']}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Link passHref href={`/users/${comment.user._id}`}>
        <div className={styles['dp']}>
          {comment.user.photo ? (
            <Image
              src={comment.user.photo}
              alt='profile picture'
              width={50}
              height={50}
              objectFit='cover'
            />
          ) : (
            <ProfilePlaceholder hasSize={false} />
          )}
        </div>
      </Link>
      <div className={styles['notdp']}>
        <div className={styles['description']}>
          <Link passHref href={`/users/${comment.user._id}`}>
            <div className={styles['name']}>{comment.user.name}</div>
          </Link>
          <div className={styles['time']}>
            {getDateTime(new Date(comment.createdAt))}
          </div>
        </div>
        <div className={styles['comment']}>{comment.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
