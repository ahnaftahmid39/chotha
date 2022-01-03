import { useState } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const AddImageBtn = ({ addImgLink }) => {
  const [imgModal, setImgModal] = useState(false);
  const [linkStatus, setLinkStatus] = useState('');
  const [imgData, setImgData] = useState({
    title: '',
    data: null,
    fileName: '',
  });

  const handleGetImageLink = async () => {
    console.log('clicked');
    if (!imgData.data) return;
    setLinkStatus('Link Generating...');
    const data = new FormData();
    data.append('photo', imgData.data);
    const raw = await fetch('/api/image', {
      body: data,
      method: 'POST',
    });
    const {
      result: { url },
    } = await raw.json();
    setLinkStatus('Success!');
    setTimeout(() => {
      addImgLink(`![${imgData.title}](${url})\n\n`);
      setImgModal(false);
      setImgData({ title: '', data: null });
      setLinkStatus('');
    }, 500);
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
      {imgModal && (
        <Modal
          className={`${styles['modal']} ${styles['image-modal']}`}
          modal={imgModal}
        >
          <input
            type='text'
            value={imgData.title}
            placeholder='Title or brief description'
            onChange={(e) => {
              setImgData({ ...imgData, title: e.target.value });
            }}
          />
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
          <span style={{ display: 'grid', placeItems: 'center' }}>
            {imgData.data && (
              <img
                style={{ maxHeight: '50vh', maxWidth: '100%' }}
                src={URL.createObjectURL(imgData.data)}
                alt=''
              />
            )}
          </span>
          <span>{linkStatus}</span>
          <div className={styles['modal-btn-group']}>
            <button
              onClick={handleGetImageLink}
              style={{
                color: imgData.data == null ? 'rgb(190, 190, 190)' : 'white',
                cursor: imgData.data == null ? 'not-allowed' : 'pointer',
              }}
            >
              Add Image
            </button>
            <button
              onClick={() => {
                setImgData({ title: '', data: null, fileName: '' });
                setImgModal(false);
                setLinkStatus('');
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

export default AddImageBtn;
