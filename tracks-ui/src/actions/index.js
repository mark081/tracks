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
      createdAt
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

const CREATE_TRACK_MUTATION = gql`
  mutation createTrack($album: String, $artist: String, $title: String) {
    createTrack(album: $album, artist: $artist, title: $title) {
      track {
        id
        title
        artist
        album
        createdAt
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
const _hlprCreateTrackAction = async (
  token,
  title,
  artist,
  album,
  dispatch
) => {
  try {
    const { data } = await gqlClient.mutate({
      mutation: CREATE_TRACK_MUTATION,
      variables: { title, artist, album },
      context: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { createTrack } = data;

    const { cache } = gqlClient;

    dispatch({
      type: "CREATE_TRACK",
      payload: createTrack.track,
    });

    const cachedData = cache.readQuery({
      query: GET_TRACKS_QUERY,
    });
    /*
     * We're going to directly update the cache here. This may not help us long term -
     */
    const tracks = [...cachedData.tracks, createTrack.track];

    cache.writeQuery({
      query: GET_TRACKS_QUERY,
      data: { tracks },
    });
  } catch (error) {
    console.log(`TODO: Disable Create Track if not logged in [${error}]`);
  }
};

export const createTrackAction = (token, title, artist, album) => {
  return (dispatch) => {
    _hlprCreateTrackAction(token, title, artist, album, dispatch);
  };
};

const _memoGetUserAction = _.memoize(async (email, dispatch) => {
  try {
    const { data } = await gqlClient.query({
      query: GET_USER_QUERY,
      variables: { email },
    });
    let user = { ...data.user, avatar: faker.image.avatar() }; //Little placeholder until photos are in
    dispatch({
      type: "GET_USER",
      payload: user,
    });
  } catch (err) {
    console.log("TODO: Prompt To Create User");
    console.log(err);
  }
});

export const getUserAction = (email) => {
  return (dispatch) => {
    _memoGetUserAction(email, dispatch);
  };
};

const _memoGetUserJWTAction = async (username, dispatch) => {
  const { data } = await gqlClient.mutate({
    mutation: GET_JWT_MUTATION,
    variables: { username },
  });
  const { tokenAuth } = data;
  dispatch({
    type: "GET_JWT",
    payload: { jwt: `JWT ${tokenAuth.token}` },
  });
};

export const getJWTAction = (username) => {
  return (dispatch) => {
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
