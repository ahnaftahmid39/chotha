import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Posts.module.css';
import markdownStyles from '../../components/markdown_editor/Markdown.module.css';
const ImageMarkdown = dynamic(() =>
  import('../../components/markdown_editor/image_markdown/ImageMarkdown')
);
const CodeMarkdown = dynamic(() =>
  import('../../components/markdown_editor/code_markdown/CodeMarkdown')
);
import {
  getAllPostsWithoutMarkdown,
  getPostById,
} from '../../lib/controllers/post';
import Head from 'next/head';

const Post = ({ post }) => {
  if (!post) return null;
  return (
    <div className='container'>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className='main'>
        <main>
          <div className={styles['head-container']}>
            <span className={styles['title']}>{post.title}</span>
          </div>
          <div className={styles['info']}>
            <div className={styles['author']}>By: {post.user?.name}</div>
            <div className={styles['time']}>
              Posted On:{' '}
              {new Date(post.createdAt).toLocaleDateString('en-UK', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}{' '}
            </div>
          </div>
          <ReactMarkdown
            className={markdownStyles['markdown-body']}
            components={{
              img: ImageMarkdown,
              code: CodeMarkdown,
            }}
          >
            {post.markdown}
          </ReactMarkdown>
        </main>
      </div>
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
