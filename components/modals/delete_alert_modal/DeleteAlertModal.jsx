import Modal from '../modal/Modal';
import styles from './DeleteAlertModal.module.css';

const DeleteAlertModal = ({
  handleDeleteCancel,
  handleDelete,
  show,
  toBeDeleted = '',
}) => {
  return (
    <Modal modal={show}>
      <div className={styles['alert']}>
        Are you sure you want to delete{toBeDeleted ? ` "${toBeDeleted}"` : ''}?
      </div>
      <div className={`${styles['btn-group']} ${styles['btn-group-confirm']}`}>
        <button
          onClick={handleDeleteCancel}
          type='button'
          className={styles['btn']}
        >
          Cancel
        </button>
        <button onClick={handleDelete} type='button' className={styles['btn']}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteAlertModal;
