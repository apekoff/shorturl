import React, { Component } from 'react';
import axios from 'axios';

class UrlForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreated: false,
      createdData: {},
      isChecked: false,
      error: false,
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  addUrl(url) {
    axios
      .request({
        method: 'post',
        url: '/api/urls',
        data: url,
      })
      .then((response) => {
        this.setState({
          error: undefined,
          errorMessage: undefined,
        });
        this.setState({ createdData: response.data });
        this.props.addCreatedData(response.data);
        console.log(response);
      })
      .catch((err) => {
        this.setState({ createdData: undefined });
        this.setState({
          error: true,
          errorMessage: err.response.data.error.message,
        });
      });
  }

  onSubmit(e) {
    e.preventDefault();

    let url = {
      original: this.refs.original.value,
      short: !this.refs.short ? '' : this.refs.short.value,
    };
    this.addUrl(url);
  }

  render() {
    const isChecked = this.state.isChecked;
    const hasErrors = this.state.error;
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        className="form-inline form-short row align-items-center justify-content-center mx-auto"
      >
        <br />
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Url"
          aria-label="Url"
          ref="original"
          name="original"
        />
        <div className="form-check">
          <input type="checkbox" id="is-checked" checked={this.state.isChecked} onChange={this.handleChange} />
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
            ref="short"
            name="short"
            defaultValue=""
          />
        ) : (
          ''
        )}

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Short
        </button>
        {hasErrors ? <div className="text-danger w-100 mb-1">{this.state.errorMessage}</div> : ''}
      </form>
    );
  }
}

export default UrlForm;
