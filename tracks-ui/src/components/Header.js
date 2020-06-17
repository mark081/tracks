import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Auth from "./Auth";
import { getUserAction } from "../actions";

class Header extends React.Component {
  componentDidMount = () => {
    if (this.props.email) {
      this.props.getUserAction(this.props.email);
    }
  };

  componentDidUpdate = () => {
    if (this.props.email) {
      this.props.getUserAction(this.props.email);
    }
  };

  displayGreeting() {
    if (this.props.user) {
      return <div>Welcome {this.props.user.username}</div>;
    } else {
      return <div>Welcome Mr. Mysterious</div>;
    }
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <div className="left menu">
          <div className="ui item">{this.displayGreeting()}</div>
        </div>
        <div className="right menu">
          <Link to="/" className="ui item">
            List Tracks
          </Link>
          <Link to="/track/create" className="ui item">
            Create Track
          </Link>
          <Auth />
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
