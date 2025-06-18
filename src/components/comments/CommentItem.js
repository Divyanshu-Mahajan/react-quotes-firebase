import { useParams } from 'react-router-dom';
import classes from './CommentItem.module.css';
import useHttp from '../hooks/use-http';
import { deleteComment } from '../lib/api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CommentItem = (props) => {
  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, error } = useHttp(deleteComment);
  
  const deleteCommentHandler = () => {
    sendRequest({ quoteId, commentId: props.id })
      .then(() => {
        toast.success('Comment deleted successfully!'); //  Success toast
        props.onDelete(props.id);
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to delete comment'); //  Error toast
      });
  };

  useEffect(() => {
    if (status === 'completed' && !error) {
      props.onDelete(props.id); // use this in parent to update UI
    }
  }, [status, error, props]);
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
      <button className='btn' onClick={deleteCommentHandler}>Delete Comment</button>
      {status === 'pending' && <p>Deleting...</p>}
      {error && <p className="error">{error}</p>}
    </li>
  );
};

export default CommentItem;
