  import React, { useState, useEffect } from 'react';
  import { connect } from 'react-redux';
  import {getData} from '../../store/actions/reduxFetch';
  import {Button} from 'react-bootstrap';
  import Octicon, {Thumbsup, Thumbsdown} from '@primer/octicons-react'
  import Heart from './Heart'

    const mapStateToProps = state => {
    return {
      user:state.user.currentUser.email,
      itinLiked: state.user.currentUser.itinerariesLiked,
      itineraries: state.itineraries.itineraries,
    };
  };


  const IconButton = ({title, user})=> {
const [likes, setLikes] = useState();
const [refresh, setRefresh] = useState(false)
           
useEffect(() => {
  getData(`/api/itineraries/byTitle/${title}`, null, data => {setLikes(data[0].rating)})
}) 

    console.log("hola ", user);

  const request = (polaridad) => (
  
    getData(`/api/itineraries/byTitle/${title}/${polaridad}`, {
      method: "PUT",
      body: JSON.stringify({
        username: {user}
      }),
      headers: {
        "Content-Type": "application/json"
      }
    },data => {console.log(data); setRefresh(!refresh)
    })
  )
  


    return (

      <> <div className="col-4 p-0 m-0">
      <Heart callback={request}/><h3>{likes}</h3>
    </div>
 
      
         
          
        
    </>
    );
      }

export default connect(mapStateToProps)(IconButton);