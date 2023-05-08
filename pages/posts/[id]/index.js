import 'katex/dist/katex.min.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import Button from '../../../components/buttons/button/Button';
import CommentSection from '../../../components/comments/CommentSection';
import Layout from '../../../components/layout/Layout';
import markdownStyles from '../../../components/markdown_editor/Markdown.module.css';
import CodeMarkdown from '../../../components/markdown_editor/code_markdown/CodeMarkdown';
import ImageMarkdown from '../../../components/markdown_editor/image_markdown/ImageMarkdown';
import DeleteAlertModal from '../../../components/modals/delete_alert_modal/DeleteAlertModal';
import Toast from '../../../components/toast/Toast';
import {
  getAllPostsWithoutMarkdown,
  getPostById,
} from '../../../lib/controllers/post';
import ls from '../../../lib/ls';
import { UserContext } from '../../../providers/UserProvider';
import styles from '../../../styles/Posts.module.css';

const Post = ({ post }) => {
  // following was added to prevent the hydration error
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  const [date, setDate] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error != '') {
      let t = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (success != '') {
      let t = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  useEffect(() => {
    let str = new Date(post?.createdAt).toLocaleDateString('en-UK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDate(str);
  }, [post]);

  const handleDeleteBtn = () => {
    setShowAlert(true);
  };

  const handleDeleteCancel = () => {
    setShowAlert(false);
  };

  const handleDelete = async () => {
    setShowAlert(false);
    try {
      const res = await fetch('/api/post/' + post._id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ls.getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        throw data.error;
      } else {
        setSuccess('Successfully deleted');
        setTimeout(() => {
          router.replace('/browse');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!!!post) return null;
  return (
    <div className='container'>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout className={styles['container']}>
        <div className={styles['head-container']}>
          <span className={styles['title']}>{post.title}</span>
        </div>

        <Toast
          offsetY='2rem'
          show={error != ''}
          handleClose={() => setError('')}
        >
          <div>{error}</div>
        </Toast>
        <Toast
          offsetY='2rem'
          show={success != ''}
          handleClose={() => setSuccess('')}
        >
          <div>{success}</div>
        </Toast>
        <div className={styles['tags-wrapper']}>
          {post.tags.length > 0 &&
            post.tags.map((tag, idx) => {
              return (
                <div className={styles['tag']} key={idx}>
                  {tag}
                </div>
              );
            })}
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
          {post.markdown}
        </ReactMarkdown>
        <div className={styles['extras']}>
          <div className={styles['info']}>
            <div className={styles['author']}>
              By: <span>{post.user?.name}</span>
            </div>
            <div className={styles['time']}>
              Posted On: <span>{date}</span>
            </div>
          </div>
          {post.user && post.user._id == userInfo._id && (
            <div className={styles['btn-group']}>
              <Link passHref href={`/posts/${post._id}/edit`}>
                <Button buttonType='outlined' type='button'>
                  Edit
                </Button>
              </Link>
              <Button
                buttonType='outlined'
                type='button'
                variant='danger'
                onClick={handleDeleteBtn}
              >
                Delete
              </Button>
              <DeleteAlertModal
                show={showAlert}
                handleDelete={handleDelete}
                handleDeleteCancel={handleDeleteCancel}
              />
            </div>
          )}
        </div>
        <CommentSection postId={post._id} />
      </Layout>
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
