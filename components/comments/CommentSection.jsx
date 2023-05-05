import { useCallback, useEffect, useState } from 'react';

import ls from '../../lib/ls';
import Comment from './Comment';
import CommentInput from './CommentInput';
import styles from './CommentSection.module.css';
import CommentSkeleton from './CommentSkeleton';

const CommentSection = ({ className, postId, ...props }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/post/${postId}/comments`, {
          method: 'GET',
        });
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        }
        setComments(data.comments);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    },
    [postId]
  );

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleWriteComment = async (comment) => {
    try {
      const res = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          comment: comment,
        }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ls.getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message);
      }
      fetchComments();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={`${styles['wrapper']} ${className}`} {...props}>
      <div className={styles['heading']}>Comments</div>
      <CommentInput handleWriteComment={handleWriteComment} />
      {isLoading ? (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      ) : (
        comments.map((comment) => {
          return <Comment comment={comment} key={comment._id} />;
        })
      )}
    </div>
  );
};

export default CommentSection;
