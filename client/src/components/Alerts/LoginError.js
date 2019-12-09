import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom'

const LoginError = (props) => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);


    return (
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ERROR</Modal.Title>
          </Modal.Header>
          <Modal.Body>There was an error, please try again!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} to="/">
              Try Again
            </Button>
            <Button variant="primary" onClick={handleClose} >
             <a id="savechang" >Go to home page</a>
            </Button>
          </Modal.Footer>
        </Modal>


                
          
        
    );
}
export default LoginError;

