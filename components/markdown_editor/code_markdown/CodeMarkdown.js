import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github, nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styles from './CodeMarkdown.module.css';

const CodeSyntax = React.memo(
  ({ node, inline, className, children, language, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');

    return !inline && match ? (
      <SyntaxHighlighter
        style={github}
        showLineNumbers
        language={match[1]}
        className={`custom-scroll ${styles['syntax-highlighter']}`}
        children={String(children).trim()}
        language={match[1]}
        PreTag='div'
        {...props}
      />
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

export default CodeSyntax;
