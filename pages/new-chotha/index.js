import Head from 'next/head';
import Editor from '../../components/markdown_editor/Editor';
import styles from '../../styles/NewChotha.module.css';
const NewChotha = () => {
  return (
    <div className={styles['page-fixed-height']}>
      <Head>
        <title>Create New chotha</title>
      </Head>
      <Editor />
    </div>
  );
};

export default NewChotha;
