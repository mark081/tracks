import { gql } from "@apollo/client";
import _ from "lodash";
import faker from "faker";
import gqlClient from "../api/trackGql";

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
      }
      likes {
        user {
          id
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
      dateJoined
      email
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

/***
 *
 * By using memoize we prevent mulitlpe calls for user info. However, this is illustrative (for now) since Apollo client caches
 * all requests anyway and I have no friggin idea how to turn that off - Note: If you suggest fetchPolicy:"no-cache" I will have to hurt you.
 *
 */

const _memoGetUserAction = _.memoize(async (id, dispatch) => {
  console.log(id);
  const { data } = await gqlClient.query({
    query: GET_USER_QUERY,
    variables: { id: id },
  });
  let user = { ...data.user, avatar: faker.image.avatar() }; //Little placeholder until photos are in
  dispatch({
    type: "GET_USER",
    payload: user,
  });
});

export const getUserAction = (id) => {
  return async (dispatch) => {
    _memoGetUserAction(id, dispatch);
  };
};

export const getDataAction = () => {
  return async (dispatch) => {
    const { data } = await gqlClient.query({
      query: GET_TRACKS_QUERY,
    });
    dispatch({
      type: "GET_DATA",
      payload: data.tracks,
    });
  };
};

export const selectTrackAction = (track) => {
  return {
    type: "GET_TRACK",
    payload: track,
  };
};
