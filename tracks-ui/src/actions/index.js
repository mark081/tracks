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
        email
      }
      likes {
        user {
          email
        }
      }
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($email: String) {
    user(email: $email) {
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

const GET_JWT_MUTATION = gql`
  mutation GetJWT($username: String!) {
    tokenAuth(username: $username, password: "password") {
      token
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

const _memoGetUserAction = _.memoize(async (email, dispatch) => {
  const { data } = await gqlClient.query({
    query: GET_USER_QUERY,
    variables: { email },
  });
  let user = { ...data.user, avatar: faker.image.avatar() }; //Little placeholder until photos are in
  dispatch({
    type: "GET_USER",
    payload: user,
  });
});

export const getUserAction = (email) => {
  return async (dispatch) => {
    _memoGetUserAction(email, dispatch);
  };
};

const _memoGetUserJWTAction = _.memoize(async (username, dispatch) => {
  console.log("_memoGetUserJWTAction");
  const { data } = await gqlClient.mutate({
    mutation: GET_JWT_MUTATION,
    variables: { username },
  });
  const { tokenAuth } = data;
  console.log(tokenAuth.token);
  dispatch({
    type: "GET_JWT",
    payload: { jwt: tokenAuth.token },
  });
});

export const getJWTAction = (username) => {
  return async (dispatch) => {
    _memoGetUserJWTAction(username, dispatch);
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

// Fire this action when the user logs in or logs out

export const authChangeAction = (
  authenticated,
  userId = null,
  email = null,
  jwt = null
) => {
  if (!authenticated) {
    userId = email = jwt = null;
  }
  return {
    type: "AUTH_CHANGE",
    payload: { isSignedIn: authenticated, currentUser: userId, email, jwt },
  };
};
