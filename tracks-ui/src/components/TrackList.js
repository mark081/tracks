import React from "react";
import { connect } from "react-redux";

import { getDataAction } from "../actions";
import UserHeader from "./UserHeader"

class TrackList extends React.Component {
  componentDidMount() {
    this.props.getDataAction();
  }
  renderList() {
    return this.props.tracks.map(({id, title, artist, postedBy}) => {
      console.log(postedBy)
      return (
        <div key={id}>
          <div className="ui item">
            <i className="ui large middle aligned icon user" />
            <div className="ui content">
              <div className="ui description">
                <h2>{title}</h2>
                <p>{artist}</p>
              </div>
                 <UserHeader x={postedBy}/>  
              <div className="ui divider"></div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { tracks: state.tracks }; //posts is defined in call to CombineReducers
};

export default connect(mapStateToProps, { getDataAction })(TrackList); //Action creator
