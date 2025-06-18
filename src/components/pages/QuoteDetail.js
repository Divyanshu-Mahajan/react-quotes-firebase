import React, { useEffect } from 'react'
import { Route, useParams,Routes, Link } from 'react-router-dom'
import { Fragment } from 'react/cjs/react-jsx-runtime.production.min'
import HighlightedQuote from '../quotes/HighlightedQuote'
import Comments from '../comments/Comments'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'



const QuoteDetail = () => {
    const { sendRequest, status ,data : loadedQuote,error } = useHttp(getSingleQuote,true)
    const params = useParams();
    const { quoteId } = params;
    console.log(params);
    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest,quoteId])
    
    if(status === 'pending'){
        return(
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }

    if(error){
        return(
            <p className='centered focused'>{error}</p>
        )
    }
    if(!loadedQuote.text){
        return(
            <p className='centered focused'>No Quote Found.</p>
        )
    }
  return (   
    <Fragment>
        <HighlightedQuote text ={loadedQuote.text} author = {loadedQuote.author}/>
        <div className='centered'>
            <Link to="/comments" className='btn--flat'>Add a Comment</Link>
        </div>
        <Routes>
            <Route path="/comments" element={<Comments />}/>
        </Routes>
        <Comments />
    </Fragment>
  )
}

export default QuoteDetail
