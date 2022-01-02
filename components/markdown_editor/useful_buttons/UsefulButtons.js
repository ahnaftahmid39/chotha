import { useState } from 'react';
import AddImageBtn from './AddImageButton';
import AddLinkButton from './AddLinkButton';
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
  const [wrap, setWrap] = useState(false);

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
      <AddLinkButton addLink={addLink} />
    </div>
  );
};

export default UsefulButtons;
