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
    <div className="ui row">
      <div className="column eight wide">
        <TrackList />
      </div>
      <div className="column eight wide">
        <TrackDetail />
      </div>
    </div>
  </div>
);

export default App;
