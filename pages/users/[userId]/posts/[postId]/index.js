import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import 'katex/dist/katex.min.css';

// import dynamic from 'next/dynamic';
// const ImageMarkdown = dynamic(() =>
//   import('../../components/markdown_editor/image_markdown/ImageMarkdown')
// );
// const CodeMarkdown = dynamic(() =>
//   import('../../components/markdown_editor/code_markdown/CodeMarkdown')
// );

import styles from '../../../../../styles/Posts.module.css';
import markdownStyles from '../../../../../components/markdown_editor/Markdown.module.css';
import ImageMarkdown from '../../../../../components/markdown_editor/image_markdown/ImageMarkdown';
import CodeMarkdown from '../../../../../components/markdown_editor/code_markdown/CodeMarkdown';

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(router.query.userId, router.query.postId);
    let shouldUpdate = true;
    async function getPost() {
      if (!!!router.query.postId) return;
      try {
        const res = await fetch(
          `/api/users/${router.query.userId}/posts/${router.query.postId}`,
          {
            method: 'GET',
          }
        );
        const data = await res.json();
        if (shouldUpdate) {
          setPost(data.post);
        }
        if (res.status != 200) {
          console.log(data.message);
          setError(data.message || data.error.message);
        }
      } catch (e) {
        setError(e.message);
        console.log(e.message || e);
      }
    }
    getPost();
    return () => {
      shouldUpdate = false;
    };
  }, [router.query.postId]);

  // following was added to prevent the hydration error
  const [date, setDate] = useState();
  useEffect(() => {
    let str = new Date(post?.createdAt).toLocaleDateString('en-UK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDate(str);
  }, [post]);

  if (!!error) return <div className='container'>{error}</div>;
  return (
    <div className='container'>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <main className='main'>
        <div className={styles['head-container']}>
          <span className={styles['title']}>{post?.title}</span>
        </div>
        <ReactMarkdown
          className={markdownStyles['markdown-body']}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            img: ImageMarkdown,
            code: CodeMarkdown,
          }}
        >
          {post?.markdown}
        </ReactMarkdown>
        <div className={styles['info']}>
          <div className={styles['author']}>By: {post?.user?.name}</div>
          <div className={styles['time']}>Posted On: {date}</div>
        </div>
      </main>
    </div>
  );
};

export default Post;
