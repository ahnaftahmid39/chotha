import { useContext, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';
// const Markdown = dynamic(() => {
//   return import('./Markdown');
// });
import Markdown from './Markdown';
import styles from './Editor.module.css';
import TextAreaInput from './TextAreaInput';
import UsefulButtons from './useful_buttons/UsefulButtons';
import { useRouter } from 'next/router';
import { UserContext } from '../../providers/UserProvider';
import Link from 'next/link';

const Editor = () => {
  const { userInfo } = useContext(UserContext);
  const [text, setText] = useState({ value: '', caret: -1, target: null });
  const router = useRouter();
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

  const addData = async ({ title, description }) => {
    try {
      const data = await fetch('/api/post', {
        body: JSON.stringify({
          markdown: text.value,
          title: title,
          description: description,
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const result = await data.json();
      console.log(result);
      router.replace('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  if (Object.keys(userInfo).length == 0)
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '95vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '4rem',
          padding: '2rem',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        Sorry you have to login to create a new chotha
        <Link className='btn' style={{ fontSize: '1.4rem' }} href={'/auth'}>
          Login
        </Link>
      </div>
    );

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
        addData={addData}
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
            className={`${styles.textarea} custom-scroll`}
          />
        </div>
        <div className={`${styles.preview} custom-scroll`}>
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
