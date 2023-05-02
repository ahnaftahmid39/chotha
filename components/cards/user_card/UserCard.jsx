import Image from 'next/image';
import Link from 'next/link';

import ProfilePlaceholder from '../../svgs/ProfilePlaceholder';
import styles from './UserCard.module.css';

const UserCard = ({ user, className, ...props }) => {
  return (
    <div className={styles['wrapper']}>
      <div>
        <div>{user.name}</div>
        {user.photo ? (
          <Image
            alt='profile picture'
            width={300}
            height={300}
            objectFit='cover'
            src={user.photo}
          />
        ) : (
          <ProfilePlaceholder />
        )}
      </div>
    </div>
  );
};

export default UserCard;
