import React from 'react';
import {useState, useEffect} from 'react';
import Carousel from 'nuka-carousel';
import CasaVicens from "../../Assets/itinerary_img/CasaVicens.jpg";
import pareja from "../../Assets/itinerary_img/pareja.jpeg";
import unbar from "../../Assets/itinerary_img/unbar.jpeg";
import manfan from "../../Assets/itinerary_img/manfan.jpeg";
import mercado from "../../Assets/itinerary_img/mercado.jpeg";
import {getData} from '../../store/actions/reduxFetch';

const ItinerariesCarousel = ({title}) => {
const [activities, setActivities] = useState();

const getActivities = (target) => {
    getData(`/api/itineraries/byTitle/${target}/activities`, null, data => {
        setActivities(data[0].activities)})
}

useEffect(() => getActivities(title) , [])

   const defaultImages = [pareja, unbar, manfan, mercado, CasaVicens];
   const randomNumber = () => Math.floor(Math.random()*4);
console.log(activities)
    return (
        <><h5>Activities</h5>
                {activities != null ? <div id="carous">
                    <Carousel wrapAround="true" slidesToShow="3.5" autoplay="true" withoutControls="true"> 
                            {activities.map(activity=>
                        
                                <div id="activity" 
                                style={{
                                height:'26vh', 
                                width:'26vw', 
                                backgroundImage: `url(${defaultImages[randomNumber()]})`,
                                backgroundSize: 'cover', backgroundPosition: 'center'

                                }}>

                                 <h3>{activity}</h3>        
                                
                                </div>
                                
                            )}
                    </Carousel>
                </div> : <h5>Loading Activities</h5>
}
            </>
    );
};


export default ItinerariesCarousel;