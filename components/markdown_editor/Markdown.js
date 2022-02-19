import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
const CodeMarkdown = dynamic(() => {
  return import('./code_markdown/CodeMarkdown');
});
const ImageMarkdown = dynamic(() => {
  return import('./image_markdown/ImageMarkdown');
});
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
  }, [contentRef]);

  return (
    <ReactMarkdown
      className={`${styles['markdown-body']} custom-scroll`}
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
