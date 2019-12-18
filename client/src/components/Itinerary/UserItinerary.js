import React, { Component } from "react";
import { connect } from "react-redux";
import ProfilePicture from "./ProfilePicture";
// import Likes from "./Likes";
import Duration from "./Duration";
import PriceRange from "./PriceRange";
import Comments from "./Comments";
import Activities from "./Activities";
import { Fragment } from "react";
import { Accordion, Button } from "react-bootstrap";
// import AccordionContainer from "./AccordionContainer";
import FaIconPack from "react-icons/lib/fa/arrow-circle-down";
import CasaVicens from "../../Assets/itinerary_img/CasaVicens.jpg";
import pareja from "../../Assets/itinerary_img/pareja.jpeg";
import unbar from "../../Assets/itinerary_img/unbar.jpeg";
import manfan from "../../Assets/itinerary_img/manfan.jpeg";
import mercado from "../../Assets/itinerary_img/mercado.jpeg";
import IconButton from './IconButton';
import CommentsContainer from './Comments/commentsContainer';
import ItinerariesCarousel from './ItinerariesCarousel';
import {getData} from '../../store/actions/reduxFetch';
import {
  requestItineraries,
  requestItinerariesSuccess,
  requestActivities,
  requestActivitiesSuccess,
  requestComments,
  requestCommentsSuccess
} from "../../store/actions/itineraryActions";
import { reduxFetch } from "../../store/actions/reduxFetch";

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries.itineraries,
    myActivities: state.itineraries.activities,
    comments: state.itineraries.comments,
    logged: state.user.logged,
    user: state.user.currentUser.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestItineraries: () =>
      dispatch(
        reduxFetch(
          "/api/itineraries",
          requestItineraries,
          requestItinerariesSuccess
        )
      ),
    requestActivities: titleParameter =>
      dispatch(
        reduxFetch(
          `/api/itineraries/byTitle/${titleParameter}/activities`,
          requestActivities,
          requestActivitiesSuccess
        )
      ),
    requestComments: () =>
      dispatch(
        reduxFetch("/api/itineraries", requestComments, requestCommentsSuccess)
      )
  };
};


class UserItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities : [],
      showComments: false

    }
  }
 


/*componentDidMount() {
  getData(`/api/itineraries/byTitle/${this.props.title}/activities`, null, data => {
    this.setState({activities:data[0].activities})})

}*/

  render() {
    const {
      username,
      userimage,
      title,
      likes,
      duration,
      priceRange,
      hashtags,
      comments,
      action,
      city,
      logged,
      user
    } = this.props;
    // const { requestActivities } = this.props;
    // const { myActivities } = this.props;
    // let renderOnClick;
    const divStyle = {
      maxWidth: "100%",
      height: "20vw",
      overflow: "hidden",
      padding: "0"
    };
    const imgStyle = {
      height: "100%",
      width: "100%",
      objectFit: "cover"
    };
    return (
      <Fragment>
        <div id="itineraryContainer" className="container rounded mt-1 p-2">
        <div className="container-fluid">
            <div className="row d-flex justify-content-start d-flex align-items-center">
              <div className="">
                <ProfilePicture username={username} userimage={userimage} />
              </div>
              <div className="">
                <h4>Mariana Coso</h4>
              </div>
              <div className="itinerarystyle col-4">
                <div className="row">
                  <div className="col-md-12">
                    <h3 id={"itineraryTitle"} className="pt-2 pl-3">
                      {title}
                    </h3>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-4 p-0 m-0">
                    {" "}
                   <IconButton title={title}></IconButton>
                  </div>
                  <div className="col-4 p-0 m-0">
                    <Duration className="duration" duration={duration} />
                  </div>
                  <div className="col-4 m-0">
                    <PriceRange
                      className="priceRange"
                      priceRange={priceRange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <span className="comments text-white mt-2">{hashtags}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
       
              {/* <Carousel
                className="d-inline-block col-sm-10 container"
                slideWidth={0.5}
                cellSpacing={10}
                slidesToShow={1.5}
                slideOffset={1}
                dragging={true}
                cellAlign="left"
              >
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} src={CasaVicens} alt="qeeeee"/>
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} src={pareja} alt="qeeeee"/>
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} src={unbar} alt="qeeeee"/>
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} src={manfan} alt="qeeeee"/>
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img alt="qeeeee" style={imgStyle} src={mercado} />
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} alt="qeeeee" src={CasaVicens} />
                </div>
                <div className="col-sm-4" style={divStyle}>
                  <img style={imgStyle} src={pareja} alt="qeeeee"/>
                </div>
              </Carousel> */}
            </div>
          </div> 
         
          <Accordion>
            <Accordion.Toggle className="toggleDeco" eventKey="0">
              <FaIconPack className="toggleDeco mr-2 row" font-size="7vh" />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Fragment>
            <ItinerariesCarousel title={title} />
            <Button onClick={() => this.setState({showComments: !this.state.showComments})}>Comments</Button>
            {this.state.showComments && <CommentsContainer logged={logged} user={user} title={title}/>}
            </Fragment>
            </Accordion.Collapse>
          </Accordion>
        </div>
      
      </Fragment>
    );
  }
}

const ReduxUserItinerary = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserItinerary);

export default ReduxUserItinerary;