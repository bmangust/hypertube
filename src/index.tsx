import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import './i18n';

import { Provider } from 'react-redux';
import store from './store/store';

if (process.env.NODE_ENV === 'production') console.log = () => {};

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
