import { gql } from "@apollo/client";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
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

export const getDataAction = () => {
  return async (dispatch) => {
    const { data } = await client.query({
      query: GET_TRACKS_QUERY,
    });
    if (data) {
      dispatch({
        type: "GET_DATA",
        payload: data.tracks,
      });
    } else {
      dispatch({
        type: "GET_DATA",
        payload: [],
      });
    }
  };
};
