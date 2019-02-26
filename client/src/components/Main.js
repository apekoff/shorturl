import React, {Component} from 'react';
import UrlForm from './UrlForm';
import Created from './Created';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreated: false,
      createdData: {},
    };
    this.addCreatedData = this.addCreatedData.bind(this);
  }

  addCreatedData(data) {
    this.setState({isCreated: true, createdData: data});
  }

  render() {
    const isCreated = this.state.isCreated;
    return (
      <div className="container">
        <br/>
        <h1>Shorturl</h1>
        <UrlForm addCreatedData={this.addCreatedData}/>
        {isCreated ? <Created createdData={this.state.createdData}/> : ''}
      </div>
    );
  }
}

export default Main;
