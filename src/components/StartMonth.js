import React, { useState } from "react";
import Axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

function StartMonth(){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);


    const restart = async () => {
        var headers = {};
        headers["Content-Type"] = "application/json";

        var params = {};
        try{
            const response = await Axios.put(REACT_APP_API_BASE_URL + "/vehicles/reset_counters",params, headers);
            if(response.status === 200){
                setShowModal(false);
                alert("El mes se comenzó exitosamente.");
            }
        }catch(error){
            console.log(error);
            alert("Ocurrió un error al comenzar el mes.");
        }
    }

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)}>Comenzar mes</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Comenzar mes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                            ¿Desea reiniciar el mes?
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => restart()}>
                    Comenzar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default StartMonth;