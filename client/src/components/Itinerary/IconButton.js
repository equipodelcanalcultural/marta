  import React from 'react';
  import { connect } from 'react-redux';
  import {getData} from '../../store/actions/reduxFetch';
  import {Button} from 'react-bootstrap';
  import Octicon, {Thumbsup, Thumbsdown} from '@primer/octicons-react'


    const mapStateToProps = state => {
    return {
      user:state.user.currentUser.email,
      itinLiked: state.user.currentUser.itinerariesLiked,
      itineraries: state.itineraries.itineraries,
    };
  };

  const IconButton = props => {

      
          const { user } = props; 
      
    console.log("hola ",props);

    return (

      <>
  
      
          <Button className="" variant="link" onClick={ () => getData(`/api/itineraries/byTitle/${props.title}/likes`, {
          method: "PUT",
          body: JSON.stringify({
            username: {user}
          }),
          headers: {
            "Content-Type": "application/json"
          }
        },(response) => console.log(response))}>

            <Octicon icon={Thumbsup} size="small" />
       
        
      </Button>
            <Button className=""  variant="link" onClick={  () => getData(`/api/itineraries/byTitle/${props.title}/dislikes`, {
            method: "PUT",
            body: JSON.stringify({
              username: {user}
            }),
            headers: {
              "Content-Type": "application/json"
            }
          },(response) => console.log(response))}>
                   <Octicon icon={Thumbsdown} size="small"/>
        </Button> 
        
    </>
    );
      }

export default connect(mapStateToProps)(IconButton);