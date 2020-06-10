import React from "react";
import { connect } from "react-redux";

import { getUserAction } from "../actions";

/**
 *
 * User Component
 *
 * This component is tied to the getUserAction and userReducer. We need the data in our redux state to render so we make the call to the AC
 * after the component mounts
 *
 * We will call the getUserActio AC which is availble to us through connect() - which connects our AC to this class
 * Additionally, connect will map our relevant REDUX state object (user) to our props. This mapping is defined in our mapStateToProps() function
 *
 *
 *
 */

class User extends React.Component {
  componentDidMount = () => {
    this.props.getUserAction(this.props.email); //Call an action to get the user information
  };

  componentDidUpdate = () => {
    this.props.getUserAction(this.props.email); //Call an action to get the user information
  };

  render = () => {
    if (this.props.user) {
      const { avatar, username, dateJoined, email } = this.props.user;
      return (
        <div className="comment">
          <a href="/" className="avatar">
            <img alt="avatar" src={avatar} />
          </a>
          <div className="content">
            <div className="author">
              <h4>Posted by {username}</h4>
            </div>
            <div className="metadata">
              User since{" "}
              <span className="date">
                {new Date(dateJoined).toDateString()}
              </span>
            </div>
            <div className="email">{email}</div>
          </div>
        </div>
      );
    } else return <div>Wait a sec</div>;
  };
}
const mapStateToProps = (state, ownProps) => {
  //mapStateToProps can take an optional second parameter - the existing props
  return { user: state.users.find((user) => user.email === ownProps.email) }; //Should be here since AC was called
};

export default connect(mapStateToProps, { getUserAction })(User);
