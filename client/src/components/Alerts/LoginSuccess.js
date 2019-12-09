import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LoginSuccess =(props)=>{ 

        const[show,setShow]= useState(true);
        
    const handleClose = () => setShow(false);


        const cerrar = () => {
            setShow(false)
            props.history.push("/")
        }

        return (

            <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome back!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Hey buddy!</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} to="/">
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} >
             <a id="savechang">Go to home page</a>
            </Button>
          </Modal.Footer>
        </Modal>

        );
    }
export default LoginSuccess;