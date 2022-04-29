import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import axios from "axios";
import reducer from "./store";
import { createStoreHook, Provider } from 'react-redux';
axios.defaults.withCredentials = true;
const client=new QueryClient();

const store=createStoreHook(reducer);
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

