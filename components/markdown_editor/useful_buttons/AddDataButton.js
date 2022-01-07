import { useRef, useState, useEffect } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const AddDataButton = ({ addData }) => {
  const [data, setData] = useState({ title: '', description: '' });
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
      <label onClick={() => setDataModal(true)} className={`btn`}>
        Save
      </label>
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
