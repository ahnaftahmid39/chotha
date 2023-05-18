import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../../../components/layout/Layout';
import Loading from '../../../components/loading_indicator/Loading';
import Editor from '../../../components/markdown_editor/Editor';

// import { getPostById } from '../../../lib/controllers/post';

const EditPost = ({}) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const postid = router.query.id;
    (async () => {
      const res = await fetch('/api/post/' + postid, { method: 'GET' });
      const data = await res.json();
      setPost(data.post);
    })();
  }, [router.query]);
  return (
    <>
      {post ? (
        <Editor post={post} />
      ) : (
        <Layout
          style={{ display: 'grid', placeItems: 'center', height: '80vh' }}
        >
          <Loading />
        </Layout>
      )}
    </>
  );
};

export default EditPost;

// export const getServerSideProps = async ({ params: { id } }) => {
//   const post = await getPostById(id);
//   const pojo = JSON.parse(JSON.stringify(post));
//   return {
//     props: {
//       post: pojo,
//     },
//   };
// };
// // export const getStaticPaths = () => {
// //   return {
// //     paths: [], //indicates that no page needs be created at build time
// //     fallback: 'blocking', //indicates the type of fallback
// //   };
// // };
