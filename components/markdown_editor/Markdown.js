import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
// import dynamic from 'next/dynamic';
// const CodeMarkdown = dynamic(() => {
//   return import('./code_markdown/CodeMarkdown');
// });
// const ImageMarkdown = dynamic(() => {
//   return import('./image_markdown/ImageMarkdown');
// });
import CodeMarkdown from './code_markdown/CodeMarkdown';
import ImageMarkdown from './image_markdown/ImageMarkdown';
import styles from './Markdown.module.css';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

const Markdown = ({ contentRef }) => {
  const [content, setContent] = useState('');

  // TODO: use debounce if possible
  useEffect(() => {
    const intervalfn = setInterval(() => {
      setContent(contentRef.current?.value);
    }, 300);
    return () => {
      clearInterval(intervalfn);
    };
  }, [contentRef]);

  return (
    <ReactMarkdown
      className={`${styles['markdown-body']} custom-scroll`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        img: ImageMarkdown,
        code: CodeMarkdown,
        // below code is to fix the warning: <div> cannot appear as descendant of <p>
        p: ({ children, className, ...props }) => (
          <div className={`${className} ${styles['p']}`} {...props}>
            {children}
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default React.memo(Markdown, (prev, next) => {
  return true;
});
