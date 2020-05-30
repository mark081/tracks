// import { ApolloProvider } from "react-apollo";
//import ApolloClient from "apollo-boost";
// import { Query } from "react-apollo";
//import { gql, useQuery } from "apollo-boost";

import { useQuery, gql } from '@apollo/client';

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    // cache: new InMemoryCache(),
    // link: new HttpLink({
    uri: "http://localhost:8000/graphql/",
  });


const GET_TRACKS_QUERY = gql`
    query GetTracks {
        tracks {
        title
        artist
        album
        }
    }
    `;

export const getDataAction = () => {
  return async (dispatch) => {
    const { loading, error, data } = await client.query({query:GET_TRACKS_QUERY})
    let response = []
    if (error)
        console.log('Error')
    else if (loading)
        console.log('Loading')
    else console.log(data.tracks)
    dispatch({
      type: "GET_DATA",
      payload: data.tracks,
    });
  };
};