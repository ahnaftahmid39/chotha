import Link from 'next/link';
import styles from './ProfilePost.module.css';
import EditIcon from '../../svgs/edit_icon/EditIcon';
import Modal from '../../modals/modal/Modal';

const ProfilePostCard = ({ post }) => {
  const [show, setShow] = useState(false);

  const handleModifyBtn = () => {
    
  };

  if (!!!post) return null;
  console.log(post);
  return (
    <div className={styles['wrapper']}>
      <div className={styles['title-modify-btn-wrapper']}>
        <div className={styles['title']}>{post.title}</div>
        <button
          type='button'
          onClick={handleModifyBtn}
          className={styles['btn-modify']}
        >
          <EditIcon />
        </button>
      </div>
      <div className={styles['description']}>{post.description}</div>
      <div className={styles['date-view-wrapper']}>
        <div className={styles['date']}>
          {new Date(post.updatedAt).toDateString()}
        </div>
        <Link key={post._id} passHref href={`/posts/${post._id}`}>
          <a className={styles['btn-view']}>View</a>
        </Link>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className={styles['tags']}>
          {post.tags.map((tag, idx) => {
            <div className={styles['tag']} key={idx}>
              {tag}
            </div>;
          })}
        </div>
      )}
    </div>
  );
};

export default ProfilePostCard;
