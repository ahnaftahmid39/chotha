import { useRef, useState, useEffect } from 'react';
import Modal from '../../modals/modal/Modal';
import styles from './UsefulButtons.module.css';

const AddLinkButton = ({ addLink }) => {
  const [link, setLink] = useState({ title: '', url: '' });
  const [linkModal, setLinkModal] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (linkModal) inputRef.current.focus();
  }, [linkModal]);

  const addLinkToContent = () => {
    let url = link.url;
    if (url.substring(0, 4) != 'http') url = 'https://' + url;
    const linkMd = `[${link.title}](${url})`;
    addLink(linkMd);
    setLinkModal(false);
    setLink({ title: '', url: '' });
  };

  return (
    <>
      <div
        onClick={() => setLinkModal(true)}
        className={`${styles['svg-icon-parent']}`}
      >
        <svg
          width='24'
          height='auto'
          viewBox='0 0 247 248'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`${styles['svg-icon-stroke']}`}
        >
          <path d='M129.279 57.9683C129.279 57.9683 154.825 30.826 174.516 11.6667C194.208 -7.49257 252.218 53.7108 236.252 73.4022C220.286 93.0937 181.435 132.477 155.357 159.087C129.279 185.697 85.6383 129.283 85.6383 129.283' />
          <path d='M118.717 189.631C118.717 189.631 93.1715 216.773 73.48 235.933C53.7885 255.092 -4.22161 193.889 11.7445 174.197C27.7105 154.506 66.5613 115.123 92.6393 88.5125C118.717 61.9023 162.358 118.316 162.358 118.316' />
        </svg>
      </div>
      <Modal
        modal={linkModal}
        className={styles['modal']}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addLinkToContent();
          }
        }}
      >
        <input
          ref={inputRef}
          type='text'
          value={link.url}
          onChange={(e) => {
            setLink({ ...link, url: e.target.value });
          }}
          placeholder='Link URL e.g: https://www.google.com'
        />
        <input
          value={link.title}
          onChange={(e) => {
            setLink({ ...link, title: e.target.value });
          }}
          type='text'
          placeholder='Title for link e.g: Google Search'
        />
        <div className={styles['modal-btn-group']}>
          <button onClick={addLinkToContent}>Add link</button>
          <button
            onClick={() => {
              setLink({ title: '', url: '' });
              setLinkModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddLinkButton;
