import { memo, useRef, useState } from 'react';
import AddDataButton from './AddDataButton';
import AddImageBtn from './AddImageButton';
import AddLinkButton from './AddLinkButton';
import styles from './UsefulButtons.module.css';

const WrapIcon = memo(() => {
  return (
    <svg
      width='24'
      viewBox='0 0 239 170'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles['svg-icon-stroke']}`}
    >
      <line x1='0.931626' y1='10.0003' x2='230.923' y2='8.03454' />
      <path d='M1 70H184.598C244.488 70 248.415 131 184.598 131' />
      <path d='M188.104 111L157 134.67L191.42 151.259L180.919 132.7L188.104 111Z' />
      <line x1='1' y1='131' x2='118' y2='131' />
    </svg>
  );
});

WrapIcon.displayName = 'WrapIcon';

const AddNewLineIcon = memo(() => {
  return (
    <svg
      width='24'
      viewBox='0 0 168 141'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles['svg-icon-stroke']}`}
    >
      <path d='M160 0V102H60' />
      <path
        d='M52 128.083L14.7636 109.554L52 79.6761V128.083Z'
        className={`${styles['svg-icon-fill']} `}
      />
    </svg>
  );
});

AddNewLineIcon.displayName = 'AddNewLineIcon';

const UsefulButtons = ({
  post,
  addImgLink,
  bolden,
  italicen,
  addNewLine,
  addHeading,
  addLink,
  toggleWrap,
  addData,
}) => {
  const [wrap, setWrap] = useState(false);

  return (
    <div className={`${styles['useful-buttons']} custom-scroll`}>
      <AddImageBtn addImgLink={addImgLink} />
      <div
        onClick={() => {
          toggleWrap(wrap);
          setWrap(!wrap);
        }}
        className={`${styles['svg-icon-parent']}`}
      >
        <WrapIcon />
      </div>
      <div onClick={bolden} className={`${styles['svg-icon-parent']}`}>
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '1.6rem',
          }}
        >
          B
        </span>
      </div>
      <div onClick={italicen} className={`${styles['svg-icon-parent']}`}>
        <span
          style={{
            fontFamily: 'monospace',
            fontStyle: 'italic',
            fontSize: '1.6rem',
          }}
        >
          I
        </span>
      </div>
      <div onClick={addNewLine} className={`${styles['svg-icon-parent']}`}>
        <AddNewLineIcon />
      </div>
      <label
        onClick={() => addHeading('h1')}
        className={`${styles['svg-icon-parent']}`}
      >
        <span
          style={{
            fontWeight: '600',
            fontSize: '1.2em',
          }}
        >
          H1
        </span>
      </label>
      <label
        onClick={() => addHeading('h2')}
        className={`${styles['svg-icon-parent']}`}
      >
        <span
          style={{
            fontWeight: '600',
            fontSize: '1.2em',
          }}
        >
          H2
        </span>
      </label>
      <label
        onClick={() => addHeading('h3')}
        className={`${styles['svg-icon-parent']}`}
      >
        <span
          style={{
            fontWeight: '600',
            fontSize: '1.2em',
          }}
        >
          H3
        </span>
      </label>
      <AddLinkButton addLink={addLink} />
      <AddDataButton addData={addData} post={post} />
    </div>
  );
};

export default UsefulButtons;
