import Link from 'next/link';
import CloseButtonIcon from '../../svgs/close_icon/CloseButtonIcon';
import styles from './EditCard.module.css';

const EditCard = ({ postId, handleClose, handleDelete, ...props }) => {
  return (
    <div className={styles['wrapper']} {...props}>
      <div className={styles['edit-close-wrapper']}>
        <Link href={`/posts/${postId}/edit`} passHref>
          <button className={styles['btn']}>
            <span>Edit</span>
          </button>
        </Link>
        <button onClick={handleClose} className={styles['btn-close']}>
          <CloseButtonIcon size={10} />
        </button>
      </div>
      <button className={styles['btn']}>
        <span>Change Privacy</span>
      </button>
      <button onClick={handleDelete} className={styles['btn-delete']}>
        <span>Delete</span>
      </button>
    </div>
  );
};

export default EditCard;
