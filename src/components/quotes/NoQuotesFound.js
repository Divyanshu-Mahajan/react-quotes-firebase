import { Link } from 'react-router-dom';
import classes from './NoQuotesFound.module.css';

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to="/new-quotes" className='btn'>
        Add a Quote
      </Link>

    </div>
  );
};

export default NoQuotesFound;
