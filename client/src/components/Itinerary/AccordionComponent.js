import React from "react";
import { Component } from "react";
import Activities from "./Activities";

class AccordionContainer extends Component {


  render() {
const {callback, accordionKey} = this.props
let conditionalRender;
if (this.props.renderCondition == true) {
    conditionalRender = <Activities title={this.props.title}/>
}
    return (
      <div>
        <button
          onClick={callback}
          eventKey={accordionKey}
        >
          Toggle
        </button>
      
          <div>
              {conditionalRender}
        
          </div>
    
      </div>
      
    );
  }
}

export default AccordionContainer;
