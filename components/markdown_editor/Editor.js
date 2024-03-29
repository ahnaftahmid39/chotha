import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';

import { UserContext } from '../../providers/UserProvider';
import Button from '../buttons/button/Button';
import styles from './Editor.module.css';
// import dynamic from 'next/dynamic';
// const Markdown = dynamic(() => {
//   return import('./Markdown');
// });
import Markdown from './Markdown';
import TextAreaInput from './TextAreaInput';
import UsefulButtons from './useful_buttons/UsefulButtons';

const VIEW = {
  fulledit: 'fulledit',
  both: 'both',
  fullpreview: 'fullpreview',
};

const Editor = ({ post }) => {
  const { userInfo } = useContext(UserContext);
  const [text, setText] = useState({
    value: post?.markdown || '',
    caret: -1,
    target: null,
  });

  const [view, setView] = useState(VIEW.both);

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

  const addData = ({ title, description, tags }) => {
    fetch(post?._id ? `/api/post/${post._id}` : '/api/post' || '/api/post', {
      body: JSON.stringify({
        author: userInfo.name,
        markdown: text.value,
        title: title,
        description: description,
        tags: tags,
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
          tags: post?.tags || [],
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
        <div className={styles.edit} data-view={view}>
          <div className={`${styles['column-header']} unselectable`}>
            <span>Edit here</span>
            <Button
              buttonType='outlined'
              className={styles['expand']}
              title='Full view of edit section'
              onClick={() => {
                setView((v) =>
                  v == VIEW.fulledit ? VIEW.both : VIEW.fulledit
                );
              }}
            >
              {view == VIEW.both ? '>>' : '<<'}
            </Button>
          </div>
          <TextAreaInput
            ref={taRef}
            text={text}
            setText={setText}
            className={`${styles.textarea} custom-scroll`}
          />
        </div>
        <div className={`${styles.preview}`} data-view={view}>
          <div className={`${styles['column-header']} unselectable`}>
            <Button
              buttonType='outlined'
              className={styles['expand']}
              title='Full view of preview'
              onClick={() => {
                setView((v) =>
                  v == VIEW.fullpreview ? VIEW.both : VIEW.fullpreview
                );
              }}
            >
              {view == VIEW.both ? '<<' : '>>'}
            </Button>
            <span>Preview</span>
          </div>
          {text.value != '' && <Markdown contentRef={taRef} />}
        </div>
      </div>
    </>
  );
};

export default Editor;
