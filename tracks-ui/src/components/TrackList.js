import React from "react";
import { connect } from "react-redux";

import { getDataAction } from "../actions";

class TrackList extends React.Component {
  componentDidMount() {
    this.props.getDataAction();
  }
  renderList() {   
      return this.props.tracks.map((track) => {
        return (
          <div className="ui item" key={track.id}>
            <i className="ui large middle aligned icon user" />
            <div className="ui content">
              <div className="ui description">
                <h2>{track.title}</h2>
                <p>{track.artist}</p>
              </div>
              {/* <UserHeader userId={post.userId} /> */}
              <div className="ui divider"></div>
            </div>
          </div>
        )
      })
    }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { tracks: state.tracks }; //posts is defined in call to CombineReducers
};

export default connect(mapStateToProps, { getDataAction })(TrackList); //Action creator
