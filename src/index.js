import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "http://smart-meeting.herokuapp.com/"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "token": "a123gjhgjsdf6576"
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
