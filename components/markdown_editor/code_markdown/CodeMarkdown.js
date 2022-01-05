import React from 'react';
import dynamic from 'next/dynamic';
const SyntaxHighlighter = dynamic(
  () => {
    return import('react-syntax-highlighter/dist/cjs/light-async');
  },
  { ssr: false }
);
import nord from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord';
import styles from './CodeMarkdown.module.css';

const CodeMarkdown = React.memo(
  function ({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={nord}
        showLineNumbers
        className={`custom-scroll ${className} ${styles['syntax-highlighter']}`}
        language={match[1]}
        PreTag='div'
        {...props}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  (prev, next) => {
    return (
      prev.children[0] === next.children[0] && prev.className === next.className
    );
  }
);

CodeMarkdown.displayName = CodeMarkdown;

export default CodeMarkdown;
