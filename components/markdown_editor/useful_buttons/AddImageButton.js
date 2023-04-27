import { memo, useEffect, useRef, useState } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const ImageIcon = memo(() => {
  return (
    <svg
      width='24'
      viewBox='0 0 230 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles['svg-icon-stroke']}`}
    >
      <path
        d='M48 8.00003H182C204.091 8.00003 222 25.9086 222 48V152C222 174.091 204.091 192 182 192H48C25.9086 192 8 174.091 8 152V48C8 25.9086 25.9086 8.00003 48 8.00003Z'
        className={`${styles['svg-image-icon-fill']}`}
      />
      <path
        d='M110 57C110 69.1503 100.15 79 88 79C75.8497 79 66 69.1503 66 57C66 44.8497 75.8497 35 88 35C100.15 35 110 44.8497 110 57Z'
        className={` ${styles['dark-fill']}`}
      />
      <path d='M8 153C8 153 34.0286 101.147 48.8364 101.147C63.6442 101.147 86.3847 153 98.5482 153C110.712 153 148.789 66.4154 169.414 72.2855C190.039 78.1557 222 153 222 153' />
    </svg>
  );
});

ImageIcon.displayName = 'ImageIcon';

const AddImageBtn = ({ addImgLink, hasTitle = true }) => {
  const [imgModal, setImgModal] = useState(false);
  const [linkStatus, setLinkStatus] = useState('');
  const ref = useRef();
  const [imgData, setImgData] = useState({
    title: '',
    data: null,
    fileName: '',
  });

  useEffect(() => {
    if (imgModal) ref.current.focus();
  }, [imgModal]);

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
        addImgLink(image);
        setImgModal(false);
        setImgData({ title: '', data: null });
        setLinkStatus('');
      }, 500);
    } catch (error) {
      console.log(error.message);
      setImgModal(false);
      setImgData({ title: error.message, data: null });
      setLinkStatus('');
    }
  };

  return (
    <>
      <div
        className={`${styles['svg-icon-parent']} `}
        onClick={() => {
          setImgModal(true);
        }}
      >
        <ImageIcon />
      </div>

      {imgModal && (
        <Modal
          className={`${styles['modal']} ${styles['image-modal']}`}
          modal={imgModal}
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
          <span style={{ display: 'grid', placeItems: 'center' }}>
            {imgData.data && (
              // eslint-disable-next-line @next/next/no-img-element
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
