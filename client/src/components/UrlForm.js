import React, {Component} from 'react';
import uniqueString from 'unique-string';
import axios from 'axios';

const urlExists = require('url-exists');

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

  isValidURL(url) {
    let reUrl = new RegExp(
      '\\b((http|https):\\/\\/?)[^\\s()<>]+(?:\\([\\w\\d]+\\)|([^[:punct:]\\s]|\\/?))', 'i',
    );
    if (reUrl.test(url)) {

      urlExists(url, function(err, exists) {
        console.log(err);
        return exists;
      });
    }
  };

  isValidText(text) {
    let reText = new RegExp(
      '\\b[a-zA-Z0-9]{7}\\b|\\b[a-zA-Z0-9]{1,12}\\b',
    );
    console.log(reText.test(text));
    return reText.test(text);

  }

  handleChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  addUrl(url) {
    axios.request({
      method: 'post',
      url: '/api/urls',
      data: url,
    }).then(response => {
      this.setState({createdData: response.data});
      this.props.addCreatedData(response.data);
      console.log(response);
    }).catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.refs.original || !this.isValidURL(this.refs.original.value)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid URL.',
      });
      return false;
    }
    if (this.refs.short && !this.isValidText(this.refs.short.value)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid shortName.',
      });
    }

    let url = {
      original: this.refs.original.value,
      short: !this.refs.short ? uniqueString() : this.refs.short.value,
    };
    this.addUrl(url);

  }

  render() {
    const isChecked = this.state.isChecked;
    const hasErrors = this.state.error;
    return (
      <form onSubmit={this.onSubmit.bind(this)}
            className="form-inline form-short row align-items-center justify-content-center mx-auto">


        <br/>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Url"
          aria-label="Url"
          ref="original"
          name="original"
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
        {hasErrors ? (
          <div
            className="text-danger w-100 mb-1">{this.state.errorMessage}</div>
        ) : (
          ''
        )}

      </form>
    );
  }
}

export default UrlForm;
