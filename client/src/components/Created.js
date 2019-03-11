import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
class Created extends Component {
  state = {
    value: "",
    copied: false,
  };
  render() {
    console.log(this.props.createdData);
    const domain = window.location.origin;
    const url = domain + "/" + this.props.createdData.short;
    return (
      <div>
        Url created <br />
        <a href={url} target="_blank" rel="noopener noreferrer">
          <code>{url}</code>
        </a>
        <br/>
        <CopyToClipboard
          text={url}
          onCopy={() => this.setState({ copied: true })}
        >
          <button className="btn btn-outline-info my-2 my-sm-0">
            Copy to clipboard
          </button>
        </CopyToClipboard>
        <br/>
        {this.state.copied ? (
          
          <span style={{ color: "red" }}>Copied.</span>
        ) : null}
      </div>
    );
  }
}

export default Created;
