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
    this.props.getUserAction(this.props.userId); //Call an action to get the user information
      };

  componentDidUpdate = () => {
    this.props.getUserAction(this.props.userId); //Call an action to get the user information
  }

  render = () => {
    if (this.props.user) {
      return (
        <div className="ui description">
          Posted By {this.props.user.username}
        </div>
      );
    } else return <div>Wait a sec</div>;
  };
}
const mapStateToProps = (state, ownProps) => {
  //mapStateToProps can take an optional second parameter - the existing props
  return { user: state.users.find((user) => user.id === ownProps.userId) }; //Should be here since AC was called
};

export default connect(mapStateToProps, { getUserAction })(User);
