import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import GoogleAuth from "./GoogleAuth";
import { getUserAction } from "../actions";

class Header extends React.Component {
  componentDidMount = () => {
    if (this.props.email) {
      this.props.getUserAction(this.props.email);
    }
  };

  componentDidUpdate = () => {
    console.log("componentDidUpdate");
    if (this.props.email) {
      this.props.getUserAction(this.props.email);
    }
  };

  displayGreeting() {
    console.log(this.props);
    if (this.props.user) {
      return <div>Welcome {this.props.user.username}</div>;
    } else {
      return <div>Welcome Mr. Mysterious</div>;
    }
  }

  render() {
    console.log('Render')
    return (
      <div className="ui secondary pointing menu">
        <div className="left menu">
          <div className="ui item">{this.displayGreeting()}</div>
        </div>
        <div className="right menu">
          <Link to="/" className="ui item">
            List Tracks
          </Link>
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.authState.email,
    users: state.users,
    user: state.users.find((user) => user.email === state.authState.email),
  };
};

export default connect(mapStateToProps, { getUserAction })(Header);
