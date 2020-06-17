import React from "react";
import { connect } from "react-redux";
import { getJWTAction } from "../actions";

import GoogleAuth from "./GoogleAuth";

class Auth extends React.Component {
  componentDidUpdate() {
   if (typeof this.props.user !== 'undefined') this.props.getJWTAction(this.props.user.username);
  }
  render() {
    return <GoogleAuth />;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authState.isSignedIn,
    user: state.users.find((user) => user.email === state.authState.email),
  };
};

export default connect(mapStateToProps, { getJWTAction })(Auth);
