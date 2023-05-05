import { useState } from 'react';

import Button from '../buttons/button/Button';
import styles from './CommentInput.module.css';

const CommentInput = ({ handleWriteComment }) => {
  const [cmnt, setCmnt] = useState('');
  return (
    <div className={styles['write-comment']}>
      <input
        placeholder='Write your comment'
        onChange={(e) => setCmnt(e.target.value)}
        value={cmnt}
      />
      <Button
        onClick={() => {
          if (cmnt != '') {
            handleWriteComment(cmnt);
            setCmnt('');
          }
        }}
      >
        Comment
      </Button>
    </div>
  );
};

export default CommentInput;
