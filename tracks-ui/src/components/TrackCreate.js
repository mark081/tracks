import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createTrackAction } from "../actions";

class TrackCreate extends React.Component {
  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* 3. meta gives us, among otherthings the ability to see if the user has touched the field yet */}
        <div style={{ color: "red" }}>
          {meta.touched === true ? meta.error : ""}
        </div>
      </div>
    );
  }
  onSubmit = ({ album, title, artist }) => {
    this.props.createTrackAction(this.props.token, title, artist, album);
    this.props.history.push("/");
  };
  render() {
    const { handleSubmit } = this.props;
    //handleSubmit need to be the method called onSubmit - passing in your handler as a callback
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form">
        {/* 2. component must be the render function */}
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Track Title"
        />
        <Field
          name="artist"
          component={this.renderInput}
          label="Enter Artist"
        />
        <Field name="album" component={this.renderInput} label="Enter Album" />
        <button className="ui button">Submit</button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "You must enter a title";
  }
  if (!values.artist) {
    errors.artist = "You must enter an artist";
  }
  if (!values.album) {
    errors.album = "You must enter an album";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    token: state.authState.jwt,
  };
};

export default withRouter(
  connect(mapStateToProps, { createTrackAction })(
    reduxForm({ form: "trackCreate", validate })(TrackCreate)
  )
);
