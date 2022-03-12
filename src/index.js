import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App.js';

let files = [];

axios.get('files.json').then((response) => {
  files = response.data;
  ReactDOM.render(<App files={files}/>, document.getElementById('root'));
}).catch((error) => {
  console.log(error);
});
