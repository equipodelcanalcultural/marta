import React from "react";
import { Component } from "react";
import AccordionComponent from './AccordionComponent';

class AccordionContainer extends Component {
  state = {
    toggle: false
  };

  setAccordionContainerState = () => {

    this.setState({toggle: !this.state.toggle})
  }
  
  
  render() {

   
    console.log(this.state.toggle)
    return (
        <AccordionComponent title={this.props.title} renderCondition={this.state.toggle} callback={this.setAccordionContainerState} titleParameter={"Barcelona"}/>
      
    );
  }
}

export default AccordionContainer;
