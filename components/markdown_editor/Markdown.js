import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react/cjs/react.development';
import CodeMarkdown from './code_markdown/CodeMarkdown';
import ImageMarkdown from './image_markdown/ImageMarkdown';
import styles from './Markdown.module.css';

const Markdown = ({ contentRef }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const intervalfn = setInterval(() => {
      setContent(contentRef.current.value);
    }, 300);
    return () => {
      clearInterval(intervalfn);
    };
  }, []);

  return (
    <ReactMarkdown
      className={styles['markdown-body']}
      components={{
        img: ImageMarkdown,
        code: CodeMarkdown,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default React.memo(Markdown, (prev, next) => {
  return true;
});
