// frontend/lib/apolloClient.ts
// 'use client';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const authLink = new ApolloLink((operation, forward) => {
  // Only access localStorage in the browser
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'http://localhost:3000/graphql' })),
  cache: new InMemoryCache(),
  // Disable SSR for simplicity, as hooks won't work on the server
  ssrMode: false,
});

export default client;