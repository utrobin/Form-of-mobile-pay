import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Test from './test'


import './css/reset.scss';
// import './css/fonts.css';
import './css/main.scss';



render(
  <Test />,
  document.getElementById('content')
);
