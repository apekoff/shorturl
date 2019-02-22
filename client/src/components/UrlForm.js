import React, { Component } from "react";

class UrlForm extends Component {
  constructor() {
    super();

    this.state = { isChecked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    const isChecked = this.state.isChecked;
    return (
      <form className="form-inline form-short row align-items-center justify-content-center">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Url"
          aria-label="Url"
        />
        <div className="form-check">
          <input
            type="checkbox"
            id="is-checked"
            checked={this.state.isChecked}
            onChange={this.handleChange}
          />
          <label htmlFor="is-checked" className="mr-sm-2 ml-sm-2">
            Custom short name?
          </label>
        </div>
        {isChecked ? (
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Custom short name"
            aria-label="Short name"
          />
        ) : (
          ""
        )}

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Short
        </button>
      </form>
    );
  }
}

export default UrlForm;
