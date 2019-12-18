import React from "react";
import { Component, Fragment } from "react";
import ItinerariesCarousel from './ItinerariesCarousel'

class Activities extends Component {
  render() {
    console.log(this.props.items);
    /*let conditionalRender;
    if (!this.state.items) {
    conditionalRender = this.state.items[0].activities
      console.log(conditionalRender);
    }*/
    return <Fragment> 
    <ItinerariesCarousel items={this.props.items}></ItinerariesCarousel>
    </Fragment>;
  }
}

const getData = async (url, init, callback) => {
  const response = await fetch(url, init);
  const data = await response.json();
  const call = await callback(data);


  return call;
};

export default Activities;
