import { useState } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const AddImageBtn = ({ addImgLink }) => {
  const [imgModal, setImgModal] = useState(false);
  const [imgData, setImgData] = useState({ title: '', data: null });

  const handleGetImageLink = async () => {
    const data = new FormData();
    data.append('photo', imgData.data);
    const raw = await fetch('/api/image', {
      body: data,
      method: 'POST',
    });
    const {
      result: { url },
    } = await raw.json();
    addImgLink(`![${imgData.title}](${url})\n\n`);
    setImgModal(false);
    setImgData({ title: '', data: null });
  };

  return (
    <>
      <label
        onClick={() => {
          setImgModal(true);
        }}
        className={`${`btn`}`}
      >
        Add Image
      </label>
      <Modal modal={imgModal}>
        <input
          type='text'
          value={imgData.title}
          onChange={(e) => {
            setImgData({ ...imgData, title: e.target.value });
          }}
        />
        <label>
          <input
            onChange={(e) => {
              setImgData({ ...imgData, data: e.target.files[0] });
            }}
            type='file'
            accept='image/png, image/jpeg, imgae/jpg, image/gif'
          />
          Choose File
        </label>
        <div className={styles['modal-btn-group']}>
          <button onClick={handleGetImageLink}>Add link</button>
          <button
            onClick={() => {
              setImgData({ title: '', data: null });
              setImgModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddImageBtn;
