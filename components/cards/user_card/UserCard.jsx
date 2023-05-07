import Image from 'next/image';
import Link from 'next/link';

import ProfilePlaceholder from '../../svgs/ProfilePlaceholder';
import styles from './UserCard.module.css';

const UserCard = ({ user, className, ...props }) => {
  return (
    <Link href={`/users/${user._id}`} passHref>
      <div className={styles['wrapper']} {...props}>
        <div className={styles['dp']}>
          {user.photo ? (
            <Image
              alt='profile picture'
              width={100}
              height={100}
              objectFit='cover'
              src={user.photo}
            />
          ) : (
            <ProfilePlaceholder hasSize={false} />
          )}
        </div>
        <div className={styles['notdp']}>
          <div className={styles['name']}>{user.name}</div>
          <div className={styles['email']}>{user.email}</div>
          <div className={styles['bio']}>{user.bio}</div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
