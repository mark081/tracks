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
        <div key={id}>
          <div className="ui item">
            <i className="ui large middle aligned icon headphones" />
            <div className="ui content">
              <div className="ui description">
                <p>{title}</p>
              </div>
              <div className="ui description">
                <p>{artist}</p>
              </div>
              <User userId={postedBy.id} />
              <div className="ui divider"></div>
            </div>
          </div>
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
