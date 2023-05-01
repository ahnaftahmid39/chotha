import { useRef, useState, useEffect, memo } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const SaveIcon = memo(() => {
  return (
    <svg
      width='20'
      viewBox='0 0 249 287'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles['svg-icon-stroke']}`}
    >
      <path d='M196.643 8H8V279H241V54L196.643 8Z' />
      <path d='M56 8V73H156.5V8' />
      <path d='M61.5 279V148H183.5L182.5 273.5' />
      <path d='M87 184H155.5' />
      <path d='M87 214H155.5' />
      <path d='M87 244H155.5' />
    </svg>
  );
});

SaveIcon.displayName = 'SaveIcon';

const AddDataButton = ({ addData, post }) => {
  const [data, setData] = useState({
    title: post?.title || '',
    description: post?.description || '',
  });
  const [dataModal, setDataModal] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (dataModal) inputRef.current.focus();
  }, [dataModal]);

  const handleAddData = () => {
    addData(data);
    setDataModal(false);
    setData({ title: '', description: '' });
  };

  return (
    <>
      <div
        onClick={() => setDataModal(true)}
        className={`${styles['svg-icon-parent']}`}
      >
        <SaveIcon />
      </div>
      <Modal
        modal={dataModal}
        className={styles['modal']}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddData();
          }
        }}
      >
        <input
          ref={inputRef}
          type='text'
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
          placeholder='Title for this post'
        />
        <input
          value={data.description}
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
          type='text'
          placeholder='Write a small description'
        />
        <div className={styles['modal-btn-group']}>
          <button onClick={handleAddData}>Done!</button>
          <button
            onClick={() => {
              setData({ title: '', description: '' });
              setDataModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddDataButton;
