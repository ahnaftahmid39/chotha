import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

import styles from '../../../styles/Posts.module.css';
import markdownStyles from '../../../components/markdown_editor/Markdown.module.css';
import ImageMarkdown from '../../../components/markdown_editor/image_markdown/ImageMarkdown';
import CodeMarkdown from '../../../components/markdown_editor/code_markdown/CodeMarkdown';
import {
  getAllPostsWithoutMarkdown,
  getPostById,
} from '../../../lib/controllers/post';
import { UserContext } from '../../../providers/UserProvider';

const Post = ({ post }) => {
  // following was added to prevent the hydration error
  const { userInfo } = useContext(UserContext);

  const [date, setDate] = useState();
  useEffect(() => {
    let str = new Date(post.createdAt).toLocaleDateString('en-UK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDate(str);
  }, [post]);
  if (!post) return null;
  return (
    <div className='container'>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className='main'>
        <div className={styles['head-container']}>
          <span className={styles['title']}>{post.title}</span>
        </div>
        {post.user && post.user._id == userInfo._id && (
          <Link href={`/posts/${post._id}/edit`}>
            <a className={styles['btn-edit']}>Edit</a>
          </Link>
        )}
        <ReactMarkdown
          className={markdownStyles['markdown-body']}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            img: ImageMarkdown,
            code: CodeMarkdown,
          }}
        >
          {post.markdown}
        </ReactMarkdown>
        <div className={styles['info']}>
          <div className={styles['author']}>By: {post.user?.name}</div>
          <div className={styles['time']}>Posted On: {date}</div>
        </div>
      </main>
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const posts = await getAllPostsWithoutMarkdown();
  return {
    paths: posts.map((post) => {
      return {
        params: {
          id: post._id.toHexString(),
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const post = await getPostById(id);
  const pojo = JSON.parse(JSON.stringify(post));
  return {
    props: {
      post: pojo,
    },
  };
};
