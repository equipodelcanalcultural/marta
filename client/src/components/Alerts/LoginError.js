import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const LoginError = (props) => {

    const [show, setShow] = useState(true);
    let handleClose = () => { setShow(false); }
    const handleShow = () => { setShow(true); }

    const cerrar = () => {
        props.cleanForm()
        setShow(false);

    }

    return (
        <>
            <div className="container-fluid col-md-6">
                <Alert show={show} variant="danger">
                        <p>Can't Login!</p>
                        <Alert.Heading >
                            Check the id and/or password
                        </Alert.Heading>
                        <Button onClick={() => cerrar()} variant="outline-danger">
                             Clean
                        </Button>
                </Alert>
            </div>
        </>
    );
}
export default LoginError;
