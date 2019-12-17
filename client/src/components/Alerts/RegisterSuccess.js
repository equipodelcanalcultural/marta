import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const RegisterSuccess =(props)=>{ 

        const[show,setShow]= useState(true);
       let handleClose =()=>{setShow(false);}
        const handleShow = ()=>{setShow(true);}  

        const cerrar = () => {
            setShow(false)
            props.history.push("/Login")
        }

        return (
            <>
            <div className="container-fluid col-md-6">
                <Alert show={show} variant="success">
                <p>
                Welcome to MYtinerary!
                </p>
                <Alert.Heading > Find your next city</Alert.Heading>
                <Button onClick={() => cerrar()} variant="outline-success">
                            Close
                </Button>
                </Alert>
            </div> 
   </>
        );
    }
export default RegisterSuccess;