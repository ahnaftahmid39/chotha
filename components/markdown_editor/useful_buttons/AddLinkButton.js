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
      <label onClick={() => setLinkModal(true)} className={`btn`}>
        Link
      </label>
      <Modal
        modal={linkModal}
        className={styles['link-modal']}
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
