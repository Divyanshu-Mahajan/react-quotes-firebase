import { useParams,useNavigate } from 'react-router-dom';
import classes from './HighlightedQuote.module.css';
import useHttp from '../hooks/use-http';
import { deleteQuote } from '../lib/api';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const HighlightedQuote = (props) => {

  const { quoteId } = useParams();
  const navigate = useNavigate();
  const { sendRequest,status,error } = useHttp(deleteQuote)

  const deleteQuoteHandler = () =>{
    sendRequest(quoteId)
  }

  useEffect(() => {
    if (status === 'completed' && !error) {
      toast.success('Quote deleted successfully!');
      navigate('/quotes'); // Redirect after deletion
    }
    if (status === 'completed' && error) {
      toast.error('Failed to delete quote.');
    }
  }, [status, error, navigate]);


  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
      <button className='btn' onClick={deleteQuoteHandler}>Delete Quote</button>
      {status === 'pending' && <p>Deleting...</p>}
    </figure>
  );
};

export default HighlightedQuote;
