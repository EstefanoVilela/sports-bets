import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

// require('./bootstrap');