import React, {Component} from 'react';

class Created extends Component {

  render() {
    console.log(this.props.createdData);
    const url = 'http://localhost:3001/' + this.props.createdData.short;
    return (
      <div>
        Url created <br/>
        <code>{url}</code>
      </div>
    );
  }
}

export default Created;
