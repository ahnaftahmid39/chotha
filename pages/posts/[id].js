import {
  getAllPostsWithoutMarkdown,
  getPostById,
} from '../../lib/controllers/post';

const Post = ({ post }) => {
  // console.log(post);
  return <pre style={{ padding: '2rem' }}>{JSON.stringify(post, null, 2)}</pre>;
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
