import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import ProfilePlaceholder from '../../svgs/ProfilePlaceholder';
import styles from './UserCard.module.css';

const UserCard = ({ user, className, ...props }) => {
  return (
    <div className={`${styles['wrapper']} ${className}`} {...props}>
      <div className={styles['profile-picture']}>
        {user.photo ? (
          <Suspense fallback={<ProfilePlaceholder height={200} width={200} />}>
            <Image
              height={200}
              width={200}
              src={user.photo}
              alt='Profile picture'
              objectFit='cover'
            />
          </Suspense>
        ) : (
          <ProfilePlaceholder hasSize={false} />
        )}
      </div>
      <div className={styles['profile-description']}>
        <div className={styles['name-email-wrapper']}>
          <div className={styles['name']}>{user.name}</div>
          <div className={styles['email']}>{user.email}</div>
        </div>
        <div className={styles['bio']}>{user.bio}</div>
        <Link href={`/users/${user._id}`} passHref>
          <button
            title='View full profile of this author and what he has published'
            className={styles['btn-view-profile']}
          >
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
