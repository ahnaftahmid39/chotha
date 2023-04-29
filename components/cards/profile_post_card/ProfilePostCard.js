import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './ProfilePost.module.css';
import EditIcon from '../../svgs/edit_icon/EditIcon';
import EditCard from '../edit_card/EditCard';
import Toast from '../../toast/Toast';
import DeleteAlertModal from '../../modals/delete_alert_modal/DeleteAlertModal';
import ls from '../../../lib/ls';

const ProfilePostCard = ({ post }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleEditOpen = () => {
    setShow(true);
  };
  const handleEditClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (error != '') {
      let t = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (success != '') {
      let t = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleDeleteBtn = () => {
    setShowAlert(true);
  };

  const handleDeleteCancel = () => {
    setShowAlert(false);
  };

  const handleDelete = async () => {
    setShowAlert(false);
    try {
      const res = await fetch('/api/post/' + post._id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ls.getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        throw data.error;
      } else {
        setSuccess('Successfully deleted');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!!!post) return null;

  return (
    <div className={styles['wrapper']}>
      <Toast show={error != ''} handleClose={() => setError('')}>
        <div>{error}</div>
      </Toast>
      <Toast show={success != ''} handleClose={() => setSuccess('')}>
        <div>{success}</div>
      </Toast>
      <DeleteAlertModal
        handleDelete={handleDelete}
        handleDeleteCancel={handleDeleteCancel}
        show={showAlert}
        toBeDeleted={post.title}
      />
      <div className={styles['title-modify-btn-wrapper']}>
        <div className={styles['title']}>{post.title}</div>
        <div className={styles['modify-btn-modal-wrapper']}>
          {!show && (
            <button
              type='button'
              onClick={handleEditOpen}
              className={styles['btn-modify']}
            >
              <EditIcon />
            </button>
          )}
          <div aria-hidden={!show} className={styles['modal-modify']}>
            <EditCard
              postId={post._id}
              handleDelete={handleDeleteBtn}
              handleClose={handleEditClose}
            />
          </div>
        </div>
      </div>
      <div className={styles['description']}>{post.description}</div>
      <div className={styles['date-view-wrapper']}>
        <div className={styles['date']}>
          {new Date(post.createdAt).toDateString()}
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
