import { useCallback, useEffect, useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const params = useParams();
  const { quoteId } = params;
  const { sendRequest,status,data:loadedComments} = useHttp(getAllComments)

  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  useEffect(() => {
    if (status === 'completed' && loadedComments) {
      setCommentsList(loadedComments);
    }
  }, [status, loadedComments]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  // Delete comment: remove from local state
  const deleteCommentHandler = (deletedId) => {
    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedId)
    );
  };

  let comments;

  if(status === 'pending'){
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'completed' && commentsList.length > 0) {
    comments = (
      <CommentsList
        comments={commentsList}
        onDeleteComment={deleteCommentHandler}
      />
    );
  }

  if (status === 'completed' && commentsList.length === 0) {
    comments = <p className='centered'>No Comment Found.</p>;
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId = {quoteId} onAddedComment = {addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
