import { gql } from "@apollo/client";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.168.1.26:8000/graphql/",
});

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

export const getUserAction = (id) => {
  return async (dispatch) => {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { id: id },
    });
    dispatch({
      type: "GET_USER",
      payload: data.user,
    });
  };
};
