import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light';
import nord from 'react-syntax-highlighter/dist/cjs/styles/prism/nord';

import styles from './CodeMarkdown.module.css';

const CodeMarkdown = React.memo(
  function ({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline ? (
      match ? (
        <SyntaxHighlighter
          style={nord}
          className={`custom-scroll ${className} ${styles['syntax-highlighter']}`}
          language={langMap[match[1]] || match[1]}
          PreTag='div'
          {...props}
          customStyle={{ overflowY: 'hidden', padding: 0, margin: 0 }}
        >
          {String(children).trim()}
        </SyntaxHighlighter>
      ) : (
        <div className={`${styles['no-highlight']} custom-scroll`}>
          <code className={`${className}`} {...props}>
            {children}
          </code>
        </div>
      )
    ) : (
      <code className={styles['inline']}>{children}</code>
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

const langMap = {
  js: 'javascript',
};
