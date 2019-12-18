import React from "react";
import { Component } from "react";
import Form from'react-bootstrap/Form';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user.currentUser.username
  };
};
 class CityInput extends Component {
  sendToParent = object => {
    this.props.callbackFromParent(object);
  };

  handleChange(event) {
    this.sendToParent({ input: event.target.value });
  }

 
  render() {
    return <Form.Control type={"text"} 
    placeholder={`Find your next city${", " + this.props.user}`} 
    className={"col-md-3 ml-2 mr-2 mt-3 justify-content-center"}
    onChange={e => this.handleChange(e)} />;
  }
}

export default connect(
  mapStateToProps,
)(CityInput);