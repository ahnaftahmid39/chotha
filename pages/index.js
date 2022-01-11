import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css';
import markdownStyles from '../components/markdown_editor/Markdown.module.css';
import fs from 'fs';
import { getAllPostsWithoutMarkdown } from '../lib/controllers/post';
import path from 'path';
const ImageMarkdown = dynamic(() =>
  import('../components/markdown_editor/image_markdown/ImageMarkdown')
);
const CodeMarkdown = dynamic(() =>
  import('../components/markdown_editor/code_markdown/CodeMarkdown')
);

export default function Home({ content, posts }) {
  return (
    <div className={styles.container}>
      <Head></Head>
      <div className={styles.main}>
        <Link href='/new-chotha' passHref prefetch={false}>
          <a className='btn'>New Chotha</a>
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
        <Link href='/about' passHref prefetch={false}>
          <a className='btn'>About</a>
        </Link>
        <div className='btn-group-post'>
          {posts.map((post) => {
            return (
              <Link key={post._id} prefetch={false} href={`/posts/${post._id}`}>
                <a className='btn'>{post.title}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const content = fs.readFileSync(path.resolve(__dirname, '../../../README.md')).toString();
  const posts = JSON.parse(JSON.stringify(await getAllPostsWithoutMarkdown()));
  return {
    props: {
      content,
      posts,
    },
    revalidate: 3,
  };
};
