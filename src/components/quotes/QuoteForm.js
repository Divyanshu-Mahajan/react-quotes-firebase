import { useRef, useState } from 'react';

import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const [authorValid, setAuthorValid] = useState(true);
  const [textValid, setTextValid] = useState(true);

  const controlStyle = (isValid) => ({
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    border: isValid ? 'none' : '1px solid red',
    padding: '0.5rem',
    borderRadius: '4px',
    backgroundColor: isValid ? 'transparent' : '#ffd1d1'
  });

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const inputStyle = {
    font: 'inherit',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    font: 'inherit',
    backgroundColor: '#0066ff',
    color: 'white',
    border: '1px solid #0066ff',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value.trim();
    const enteredText = textInputRef.current.value.trim();

    const isAuthorValid = enteredAuthor !== '';
    const isTextValid = enteredText !== '';

    setAuthorValid(isAuthorValid);
    setTextValid(isTextValid);

    // Stop if either field is invalid
    if (!isAuthorValid || !isTextValid) {
      return;
    }

    // Submit if both are valid
    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    // Optionally clear the inputs
    authorInputRef.current.value = '';
    textInputRef.current.value = '';
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div style={controlStyle(authorValid)}>
          <label htmlFor="author" style={labelStyle}>Author</label>
          <input type="text" id="author" ref={authorInputRef} style={inputStyle} />
        </div>
        <div style={controlStyle(textValid)}>
          <label htmlFor="text" style={labelStyle}>Text</label>
          <textarea id="text" rows="5" ref={textInputRef} style={inputStyle}></textarea>
        </div>
        <div>
          <button type="submit" style={buttonStyle}>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
