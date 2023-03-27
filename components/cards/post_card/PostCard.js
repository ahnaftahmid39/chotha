import styles from './PostCard.module.css';
const PostCard = ({ post, onClick }) => {
  const { title, user, description, createdAt } = post;
  return (
    <div onClick={onClick} className={`${styles['card']}`}>
      <div className={styles['author']}>{user?.name}</div>
      <div className={styles['time']}>
        {new Date(createdAt).toLocaleDateString('en-UK', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}{' '}
      </div>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['description']}>{description}</div>
    </div>
  );
};

export default PostCard;
