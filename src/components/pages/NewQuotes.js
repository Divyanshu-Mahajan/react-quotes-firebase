import React, { useEffect } from 'react'
import QuoteForm from '../quotes/QuoteForm'
import { useNavigate } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'

const NewQuotes = () => {
  const { sendRequest,status} = useHttp(addQuote)

  const navigate = useNavigate();
  useEffect(()=>{
    if(status === 'completed'){
      navigate('/quotes')
    }
  },[status,navigate])
    const addQuoteHandler = (quoteData) =>{
        console.log(quoteData)
        sendRequest(quoteData)
    }
  return (
    <QuoteForm onAddQuote = {addQuoteHandler}/>
  )
}

export default NewQuotes
