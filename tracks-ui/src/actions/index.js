import { gql } from "@apollo/client";
import ApolloClient from "apollo-boost";
import _ from "lodash"

//TODO: Get this into a config file

const client = new ApolloClient({
  uri: "http://192.168.1.26:8000/graphql/",
});

/**
 * 
 * GraphQL Queries
 * 
 */

const GET_TRACKS_QUERY = gql`
  query GetTracks {
    tracks {
      id
      title
      artist
      album
      postedBy {
        id
        username
      }
      likes {
        user {
          id
          username
        }
      }
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($id: Int) {
    user(id: $id) {
      username
      id
      trackSet {
        id
      }
      likeSet {
        track {
          id
        }
      }
    }
  }
`;

/**
 * 
 * REDUX Actions: all data that comes to Resolvers must come from actions
 * 
 */

export const getDataAction = () => {
  return async (dispatch) => {
    const { data } = await client.query({
      query: GET_TRACKS_QUERY,
    });
    dispatch({
      type: "GET_DATA",
      payload: data.tracks,
    });
  };
};

/***
 * 
 * By using memoize we prevent mulitlpe calls for user info. However, this is illustrative (for now) since Apollo client caches
 * all requests anyway
 * 
 */


const _memoGetUserAction =  _.memoize (async (id, dispatch) => {
  const { data } = await client.query({
    query: GET_USER_QUERY,
    variables: { id: id },
  });
  dispatch({
    type: "GET_USER",
    payload: data.user,
  });
})

export const getUserAction = (id) => {
  return async (dispatch) => {
     _memoGetUserAction(id,dispatch)
  };
};

