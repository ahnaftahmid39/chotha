import { useEffect, useRef, useState } from 'react';

import styles from '../../markdown_editor/useful_buttons/UsefulButtons.module.css';
import Modal from '../../modals/modal/Modal';

const AddImageModal = ({
  handleImage,
  show = false,
  handleClose,
  hasTitle = true,
}) => {
  const [linkStatus, setLinkStatus] = useState('');
  const ref = useRef();
  const [imgData, setImgData] = useState({
    title: '',
    data: null,
    fileName: '',
  });

  useEffect(() => {
    if (hasTitle) ref.current?.focus();
  }, [hasTitle]);

  const handleGetImageLink = async () => {
    if (!imgData.data) return;
    setLinkStatus('Link Generating...');
    const data = new FormData();
    data.append('photo', imgData.data);
    try {
      const raw = await fetch('/api/image', {
        body: data,
        method: 'POST',
      });
      if (raw.status == 400) throw Error(res.error);
      if (raw.status == 500) throw Error('Something went wrong with server');
      const {
        result: { url },
      } = await raw.json();
      setLinkStatus('Success!');
      const image = { url, title: imgData.title };
      setTimeout(() => {
        handleImage(image);
        setImgData({ title: '', data: null });
        setLinkStatus('');
      }, 500);
    } catch (error) {
      console.log(error.message);
      setImgData({ title: error.message, data: null });
      setLinkStatus('');
    }
  };

  return (
    <>
      {show && (
        <Modal
          className={`${styles['modal']} ${styles['image-modal']}`}
          modal={show}
        >
          {hasTitle && (
            <input
              type='text'
              ref={ref}
              value={imgData.title}
              placeholder='Title or brief description'
              onChange={(e) => {
                setImgData({ ...imgData, title: e.target.value });
              }}
            />
          )}
          <label className={styles['file-input']}>
            <input
              onChange={(e) => {
                setImgData({ ...imgData, data: e.target.files[0] });
                console.log(e.target.files[0]);
                e.target.value = '';
              }}
              type='file'
              accept='image/png, image/jpeg, imgae/jpg, image/gif'
            />
            <span>{!imgData.data ? 'Choose File...' : imgData.data.name}</span>
            <span className={styles['file-input-browse']}>Browse</span>
          </label>
          {imgData.data && (
            <span style={{ display: 'grid', placeItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{ maxHeight: '50vh', maxWidth: '100%' }}
                src={URL.createObjectURL(imgData.data)}
                alt=''
              />
            </span>
          )}
          {linkStatus && <span>{linkStatus}</span>}
          <div className={styles['modal-btn-group']}>
            <button
              onClick={handleGetImageLink}
              style={{
                cursor: imgData.data == null ? 'not-allowed' : 'pointer',
              }}
            >
              Add Image
            </button>
            <button
              onClick={() => {
                setImgData({ title: '', data: null, fileName: '' });
                setLinkStatus('');
                handleClose();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddImageModal;
