import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  const deleteCommentFromState = (deletedId) => {
    props.onDeleteComment(deletedId); // calling parent's handler
  };

  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          text={comment.text}
          onDelete={deleteCommentFromState}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
