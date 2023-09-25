import React, { useState } from 'react';
import { postUrl } from '../../apiCalls';

function UrlForm({addToUrls}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [formError, setFormError] = useState('');


  const handleSubmit = e => {
    e.preventDefault();

   let newUrl = {
      long_url: urlToShorten, 
      title: title
    }

    if (!title || !urlToShorten) {
      setFormError('Please enter title and description')
      clearInputs();
    } else {

      postUrl(newUrl)
      .then(data => {
        addToUrls(data);
      }).catch(error => console.log(error.message))
  
      clearInputs();
    }
   
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='url'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>

      {formError && <h2>{formError}</h2> }
    </form>
  )
}

export default UrlForm;
