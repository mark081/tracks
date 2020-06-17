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
          //3. Pass the sign-in status to the action creator
          if (this.auth.isSignedIn.get()) {
            this.props.authChangeAction(
              this.auth.isSignedIn.get(),
              this.auth.currentUser.get().getId(),
              this.auth.currentUser.get().getBasicProfile().getEmail()
            );
          } else this.props.authChangeAction(false)
          //4. Pass our event handler to the listener
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  hlpSignOut = () => {
    this.auth.signOut();
    // this.auth.disconnect();
    this.props.authChangeAction(false);
  };
  onAuthChange = () => {
    const loggedIn = this.auth.isSignedIn.get();
    if (loggedIn) {
      this.props.authChangeAction(
        this.auth.isSignedIn.get(),
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getEmail()
      );
    } else {
      this.props.authChangeAction(this.auth.isSignedIn.get());
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.hlpSignOut}>
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
  return {
    isSignedIn: state.authState.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  authChangeAction,
})(GoogleAuth);
