import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css';
import markdownStyles from '../components/markdown_editor/Markdown.module.css';
import fs from 'fs';
const ImageMarkdown = dynamic(() =>
  import('../components/markdown_editor/image_markdown/ImageMarkdown')
);
const CodeMarkdown = dynamic(() =>
  import('../components/markdown_editor/code_markdown/CodeMarkdown')
);

export default function Home({ content }) {
  return (
    <div className={styles.container}>
      <Head></Head>
      <div className={styles.main}>
        <Link href='/new-chotha'>
          <span className='btn'>New Chotha</span>
        </Link>
        <ReactMarkdown
          className={markdownStyles['markdown-body']}
          components={{
            img: ImageMarkdown,
            code: CodeMarkdown,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export const getStaticProps = () => {
  const content = fs.readFileSync('README.md').toString();
  return {
    props: {
      content,
    },
  };
};
