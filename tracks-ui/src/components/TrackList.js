import React from "react";
import { connect } from "react-redux";

import { getDataAction } from "../actions";
import { selectTrackAction} from "..//actions";


/**
 *
 * TrackList Component
 *
 * This component is tied to the getDataAction and trackReducer. We need the data in our redux state to render so we make the call to the AC
 * after the component mounts
 *
 * We will call the getDatAction AC which is availble to us through connect() - which connects our AC to this class
 * Additionally, connect will map our relevant REDUX state object (track) to our props. This mapping is defined in our mapStateToProps() function
 *
 *
 *
 */

class TrackList extends React.Component {
  componentDidMount() {
    this.props.getDataAction();
  }

  hlpRender() {
    const tracks = this.props.tracks.map((track) => {
      return (
        <div className="ui item" key={track.title}>
          <div className="ui right floated content">
            <button
              className="ui button primary"
              onClick={() => this.props.selectTrackAction(track)}
            >
              Select
            </button>
          </div>
          <div className="ui content">{track.title}</div>
        </div>
      );
    });
    return <div className="ui divided list">{tracks}</div>;
  }


  render() {
    return this.hlpRender();
  }
}

const mapStateToProps = (state) => {

  return { tracks: state.tracks }; //tracks is defined in call to CombineReducers
};

export default connect(mapStateToProps, { getDataAction, selectTrackAction })(TrackList); //Action creator
