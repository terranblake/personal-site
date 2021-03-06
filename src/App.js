import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';

const apolloServerURI = 'https://desolate-scrubland-72419.herokuapp.com:59648/';
console.log({ apolloServerURI });

const client = apolloServerURI
  ? new ApolloClient({
    uri: apolloServerURI
  })
  : null;

function App() {
  return client
    ? (
      <ApolloProvider client={client}>
        <div>Hello World</div>
        <Query
          query={
            gql`
              {
                posts {
                  title
                  createdAt
                }
              }
            `
          }
        >
          {
            (data) => {
              data = data.data
              if (!data || data.posts === undefined) return null;

              return (
                <ul>
                  {
                    data.posts.map(({ title, createdAt }) => {
                      return <li key={createdAt}>{createdAt} - {title}</li>
                    })
                  }
                </ul>
              )
            }
          }
        </Query>
      </ApolloProvider>
    )
    : <div>apollo server not configured</div>
}

export default App;
