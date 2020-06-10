import React from "react";
import { connect } from "react-redux";

import { authChangeAction } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //1. Load up the client specifying client id and desired scope
      window.gapi.client
        .init({
          clientId:
            "394191418059-mivapikt8k28mjjtslh2lvdrgva58uoq.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          //2. Get the authentication object
          this.auth = window.gapi.auth2.getAuthInstance();
          //3. Pass the sign-in status to the action creator - Question: Can the user ever be logged in here?
          this.props.authChangeAction(
            this.auth.isSignedIn.get(),
            this.auth.currentUser.get().getId(),
          );
          //4. Pass our event handler to the listener
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.props.authChangeAction(
      this.auth.isSignedIn.get(),
      this.auth.currentUser.get().getId(),
      this.auth.currentUser.get().getBasicProfile().getEmail()
    );
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.auth.signOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.auth.signIn}>
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.authState.isSignedIn };
};

export default connect(mapStateToProps, { authChangeAction })(GoogleAuth);
