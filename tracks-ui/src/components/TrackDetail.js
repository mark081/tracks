import User from "./User";
import React from "react";
import { connect } from "react-redux";

class TrackDetail extends React.Component {
  render = () => {
    if (this.props.track.id) {
      let album, artist, postedBy, title;
      ({ album, artist, postedBy,title } = this.props.track);
      return (
        <div>
          <h3>Details for:</h3>
          <p>
            Title: {title}
            <br />
            Album: {album}
            <br />
            Artist: {artist}
          </p>
          <User email={postedBy.email} />
        </div>
      );
    } else {
      return <div>Select Track</div>;
    }
  };
}

const mapStateToProps = (state) => {
  return { track: state.track };
};

export default connect(mapStateToProps)(TrackDetail);
