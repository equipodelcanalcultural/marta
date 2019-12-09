import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RegisterError =(props)=>{ 

        const[show,setShow]= useState(true);
        const handleClose = () => setShow(false);
    //    let handleClose =()=>{setShow(false);}
    //     const handleShow = ()=>{setShow(true);}  

        const cerrar = () => {
            props.cleanForm()
            setShow(false);

        }

        return (
            <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ERROR</Modal.Title>
          </Modal.Header>
          <Modal.Body>The user already exists, please try again!</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} to="/">
              Try Again
            </Button>
            <Button variant="primary" onClick={handleClose} >
             <a id="savechang">Go to home page</a>
            </Button>
          </Modal.Footer>
        </Modal>
        );
    }
export default RegisterError;