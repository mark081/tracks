import React from "react";
import TrackList from "./TrackList";
import TrackDetail from "./TrackDetail";

/**
 *
 * Currently TrackList is our main container component
 *
 */

const App = () => (
  <div className="ui container grid">
    <div className="ui column">
      <div className="row eight wide">
        <TrackList />
      </div>
      <div className="row eight wide">
        <TrackDetail />
      </div>
    </div>
  </div>
);

export default App;
