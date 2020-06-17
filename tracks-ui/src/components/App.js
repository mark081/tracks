import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TrackList from "./TrackList";
import TrackDetail from "./TrackDetail";
import Header from "./Header";
import TrackCreate from "./TrackCreate";


const hlpRender = () => {
  return (
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
};

const App = () => {
  return <div className="ui container">
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" exact component={hlpRender}></Route>
        <Route path="/track/create" exact component={TrackCreate}></Route>
      </div>
    </BrowserRouter>
  </div>;
};

export default App;
