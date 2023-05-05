import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { getDateTime } from '../../lib/utils/date';
import { UserContext } from '../../providers/UserProvider';
import Button from '../buttons/button/Button';
import ProfilePlaceholder from '../svgs/ProfilePlaceholder';
import styles from './Comment.module.css';

const Comment = ({ comment, userId }) => {
  return (
    <div className={styles['comment-wrapper']}>
      <div className={styles['dp']}>
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
              <ProfilePlaceholder width={`50px`} height={`100%`} />
            )}
          </div>
        </Link>
      </div>
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
      {userId == comment.user._id && (
        <button title='Edit' className={styles['btn-edit']}>
          ...
        </button>
      )}
    </div>
  );
};

export default Comment;
