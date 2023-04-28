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

const Editor = ({ post }) => {
  const { userInfo } = useContext(UserContext);
  const [text, setText] = useState({
    value: post?.markdown || '',
    caret: -1,
    target: null,
  });
  const router = useRouter();
  const taRef = useRef();
  const bolden = () => {
    taRef.current.boldItalic('bold');
  };

  const italicen = () => {
    taRef.current.boldItalic('italic');
  };

  const addImgLink = (image) => {
    const markdownImageLink = `![${image.title}](${image.url})\n\n`;
    setText({
      ...text,
      value: text.value + '  \n' + markdownImageLink,
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

  const addData = ({ title, description }) => {
    fetch(post?._id ? `/api/post/${post._id}` : '/api/post' || '/api/post', {
      body: JSON.stringify({
        markdown: text.value,
        title: title,
        description: description,
      }),
      method: post?._id ? 'PUT' : 'POST' || 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return;
        router.replace('/browse');
      });
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
        <Link href={'/auth'}>
          <a className='btn' style={{ fontSize: '1.4rem' }}>
            Login
          </a>
        </Link>
      </div>
    );

  return (
    <>
      <UsefulButtons
        post={{
          title: post?.title || '',
          description: post?.description || '',
        }}
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
