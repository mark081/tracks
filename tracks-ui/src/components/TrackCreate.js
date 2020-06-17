import React from "react";
import { Field, reduxForm } from "redux-form";

class TrackCreate extends React.Component {
  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* meta gives us, among otherthings the ability to see if the user has touched the field yet */}
        <div style={{ color: "red" }}>
          {meta.touched === true ? meta.error : ""}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    console.log(values)
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form">
        {/* component must be the render function */}
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
        <Field
          name="album"
          component={this.renderInput}
          label="Enter Album"
        />
        <button className="ui button">Submit</button>        
      </form>
    );
  }
}

//1. reduxForm() takes the place of Connect() - Note {form:"foo"} is mandatory and "foo" will tie everything together
export default reduxForm({ form: "trackCreate" })(TrackCreate);
