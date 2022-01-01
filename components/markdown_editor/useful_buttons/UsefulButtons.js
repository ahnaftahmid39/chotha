import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../../modals/modal/Modal';
import AddImageBtn from './AddImageButton';
import styles from './UsefulButtons.module.css';

const UsefulButtons = ({
  addImgLink,
  bolden,
  italicen,
  addNewLine,
  addHeading,
  addLink,
  toggleWrap,
}) => {
  const [linkModal, setLinkModal] = useState(false);
  const [link, setLink] = useState({ title: '', url: '' });
  const [wrap, setWrap] = useState(false);
  const inputRef = useRef();

  const addLinkToContent = useCallback(() => {
    let url = link.url;
    if (url.substring(0, 4) != 'http') url = 'https://' + url;
    const linkMd = `[${link.title}](${url})`;
    addLink(linkMd);
    setLinkModal(false);
    setLink({ title: '', url: '' });
  });

  useEffect(() => {
    if (linkModal) inputRef.current.focus();
  }, [linkModal]);

  return (
    <div className={styles['useful-buttons']}>
      <AddImageBtn addImgLink={addImgLink} />

      <label
        onClick={() => {
          toggleWrap(wrap);
          setWrap(!wrap);
        }}
        className={`btn`}
      >
        {wrap ? 'Unwrap' : ' Wrap '}
      </label>
      <label onClick={bolden} className={`btn`}>
        Bold
      </label>
      <label onClick={italicen} className={`btn`}>
        Italic
      </label>
      <label onClick={addNewLine} className={`btn`}>
        New Line
      </label>
      <label onClick={() => addHeading('h1')} className={`btn`}>
        H1
      </label>
      <label onClick={() => addHeading('h2')} className={`btn`}>
        H2
      </label>
      <label onClick={() => addHeading('h3')} className={`btn`}>
        H3
      </label>
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
    </div>
  );
};

export default UsefulButtons;
