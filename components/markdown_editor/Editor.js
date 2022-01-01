import { useCallback, useRef, useState } from 'react';
import Markdown from './Markdown';
import styles from './Editor.module.css';
import TextAreaInput from './TextAreaInput';
import UsefulButtons from './useful_buttons/UsefulButtons';

const Editor = () => {
  const [text, setText] = useState({ value: '', caret: -1, target: null });
  const taRef = useRef();

  const bolden = useCallback(() => {
    taRef.current.boldItalic('bold');
  });

  const italicen = useCallback(() => {
    taRef.current.boldItalic('italic');
  });

  const addImgLink = useCallback((link) => {
    setText({
      ...text,
      value: text.value + '  \n' + link,
    });
    taRef.current.focus();
  });

  const addLink = useCallback((link) => {
    setText({
      ...text,
      value: text.value + link,
    });
    taRef.current.focus();
  });

  const addNewLine = useCallback(() => {
    taRef.current.newLine();
  });

  const addHeading = useCallback((type) => {
    taRef.current.giveHeadings(type);
  });

  const toggleWrap = useCallback((wrap) => {
    taRef.current.toggleWrap(wrap);
  });

  return (
    <>
      <UsefulButtons
        addImgLink={addImgLink}
        addLink={addLink}
        bolden={bolden}
        addNewLine={addNewLine}
        italicen={italicen}
        addHeading={addHeading}
        toggleWrap={toggleWrap}
      />
      <div className={styles.layout}>
        <div className={styles.edit}>
          <div className={`${styles['column-header']} unselectable`}>
            Edit here
          </div>
          <TextAreaInput
            ref={taRef}
            text={text}
            setText={setText}
            className={styles.textarea}
          />
        </div>
        <div className={styles.preview}>
          <div className={`${styles['column-header']} unselectable`}>
            Preview
          </div>
          <Markdown contentRef={taRef} />
        </div>
      </div>
    </>
  );
};

export default Editor;
