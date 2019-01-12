import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://foo.bar',
    }),
    cache: new InMemoryCache()
  });
  ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
