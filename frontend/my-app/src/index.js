import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import dotenv from 'dotenv'
dotenv.config()
ReactDOM.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>,
  document.getElementById('root')
);
