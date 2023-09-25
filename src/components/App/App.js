import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getUrls()
    .then(data => {
      setUrls(data.urls)
    }) .catch(error => {
      setError(error.message)
    })
  }, [])

  const addToUrls = (newUrl) => {
    setUrls([...urls, newUrl])
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addToUrls={addToUrls} setError={setError}/>
      </header>
      {error ? <h2>{error} - please try again later.</h2> : 
      <UrlContainer urls={urls}/>}
    </main>
  );
}

export default App;
