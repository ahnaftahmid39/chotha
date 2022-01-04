import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const Markdown = dynamic(() => {
  return import('./Markdown');
});
import styles from './Editor.module.css';
import TextAreaInput from './TextAreaInput';
import UsefulButtons from './useful_buttons/UsefulButtons';

const Editor = () => {
  const [text, setText] = useState({ value: '', caret: -1, target: null });
  const taRef = useRef();
  const bolden = () => {
    taRef.current.boldItalic('bold');
  };

  const italicen = () => {
    taRef.current.boldItalic('italic');
  };

  const addImgLink = (link) => {
    setText({
      ...text,
      value: text.value + '  \n' + link,
    });
    taRef.current.focus();
  };

  const addLink = (link) => {
    setText({
      ...text,
      value: text.value + link,
    });
    taRef.current.focus();
  };

  const addNewLine = () => {
    taRef.current.newLine();
  };

  const addHeading = (type) => {
    taRef.current.giveHeadings(type);
  };

  const toggleWrap = (wrap) => {
    taRef.current.toggleWrap(wrap);
  };

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
          {text.value != '' && <Markdown contentRef={taRef} />}
        </div>
      </div>
    </>
  );
};

export default Editor;
