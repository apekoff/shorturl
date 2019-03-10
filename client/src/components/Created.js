import React, { Component } from 'react';

class Created extends Component {
  render() {
    console.log(this.props.createdData);
    const url = '/' + this.props.createdData.short;
    return (
      <div>
        Url created <br />
        <a href={url} target="_blank" rel="noopener noreferrer">
          <code>{url}</code>
        </a>
      </div>
    );
  }
}

export default Created;
