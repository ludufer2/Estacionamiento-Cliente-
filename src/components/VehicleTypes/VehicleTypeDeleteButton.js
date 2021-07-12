import React, { useState } from "react";
import Axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

function VehicleTypeDeleteButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);

    const destroy = async () => {
        var headers = {};
        headers["Content-Type"] = "application/json";

        var params = {};
        const response = await Axios.delete(REACT_APP_API_BASE_URL + "/vehicletypes/" + props.id,params, headers);
        if(response.status === 204){
            setShowModal(false);
            props.getVehicleTypes();
            alert("El tipo de vehiculo se eliminó exitosamente.");
        }else{
            alert("Ocurrió un error al eliminar el registro.");
        }
    }

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)} className="mr-1" variant="danger">Eliminar</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Actualizar tipo de vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                            ¿Estas seguro de eliminar el tipo de vehiculo <b>{props.Name}</b>?
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => destroy()}>
                    Eliminar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default VehicleTypeDeleteButton;