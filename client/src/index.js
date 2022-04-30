import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import axios from "axios";
import reducer from "./store";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
axios.defaults.withCredentials = true;
const client=new QueryClient();

const store=createStore(reducer);
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

