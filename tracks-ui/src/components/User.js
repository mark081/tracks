import React from 'react'
import { connect } from 'react-redux';

import {getUserAction} from '../actions'

class User extends React.Component {
    componentDidMount = () =>
        this.props.getUserAction(this.props.userId) //Call an action to get the user information


    render = () => {
        console.log(this.props.user)
        if (this.props.user)
            return <div>Posted By {this.props.user.username}</div>;
        else
            return <div>Wait a sec</div>;
    }
        
}
const mapStateToProps = (state, ownProps) => { //mapStateToProps can take an optional second parameter - the existing props
    return {user: state.users.find((user) => user.id === ownProps.userId)}; //Should be here since AC was called
}

export default connect(mapStateToProps, {getUserAction})(User);