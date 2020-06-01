import React from "react";
import { connect } from "react-redux";

import { getDataAction } from "../actions";
import User from "./User";

class TrackList extends React.Component {
  componentDidMount() {
    this.props.getDataAction();
  }
  
  hlpRender() {
    return this.props.tracks.map(({ id, title, artist, postedBy }) => {
      return (
        <div className="ui raised segment" key={id}>
          <div className="ui blue ribbon label">
            <span style={{ fontSize: "medium" }}>{title} </span>- {artist}
          </div>
          <User userId={postedBy.id} />
          <div className="ui divider"></div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.hlpRender()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { tracks: state.tracks }; //posts is defined in call to CombineReducers
};

export default connect(mapStateToProps, { getDataAction })(TrackList); //Action creator
