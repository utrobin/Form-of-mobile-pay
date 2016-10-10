import './css/reset.scss';
import './css/fonts.css';
import './css/main.scss';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Form from './form/form'

render(
  <Form />,
  document.querySelector('.content')
);
