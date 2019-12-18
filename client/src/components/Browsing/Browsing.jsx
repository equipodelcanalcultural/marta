import React from "react";
import { Link} from "react-router-dom";
import CarouselNav from "../Carousel/CarouselNav";
import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    user: state.user.currentUser.username
  };
};

const browsing = ({ flecha, user }) => {
  return (
    <div className="container-fluid p-4">
      
      <p>
        {user && <span>Hello <span className={"cool-touch"}>{user}</span>!</span>} Find your <span className={"cool-touch"}>perfect trip</span>, <br></br>
        designed by insiders who know and{" "}
        <span className={"cool-touch"}>love</span> their{" "}
        <span className={"cool-touch"}>cities</span>
      </p>
      <Link to="/cities">
        <img id={"Arrow"} src={flecha} alt="" />
      </Link>

      <CarouselNav height={"33em"} width={"33em"}/>
    </div>
  );
};

export default connect(
  mapStateToProps,
)(browsing);
