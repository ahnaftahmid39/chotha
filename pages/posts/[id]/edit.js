import Editor from '../../../components/markdown_editor/Editor';
import { getPostById } from '../../../lib/controllers/post';

const EditPost = ({ post }) => {
  return (
    <div>
      <Editor post={post} />
    </div>
  );
};

export default EditPost;

export const getStaticProps = async ({ params: { id } }) => {
  const post = await getPostById(id);
  const pojo = JSON.parse(JSON.stringify(post));
  return {
    props: {
      post: pojo,
    },
  };
};
export const getStaticPaths = () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};
