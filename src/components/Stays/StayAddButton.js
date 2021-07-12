import React, { useState } from "react";
import Axios from 'axios';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

function StayAddButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [LicensePlate, setLicensePlate] = useState('');

    const store = async () => {
        var error = false;
        if(LicensePlate === ""){
            error = true;
        }

        if(error){
            alert("Alguno de los campos no se completo");
        }else{
            var headers = {};
            headers["Content-Type"] = "application/json";

            var params = {};
            params.license_plate = LicensePlate.toUpperCase().replaceAll(' ','');
            try{
                const response = await Axios.post(REACT_APP_API_BASE_URL + "/stays",params, headers);
                if(response.status === 201){
                    setShowModal(false);
                    setLicensePlate('');
                    props.setStays([...props.Stays, response.data]);
                    alert("La reserva se añadió exitosamente.");
                }else if(response.status === 200){
                    if(typeof response.data.error !== "undefined"){
                        if(response.data.error.status === "404"){
                            alert("La patente ingresada no esta dada de alta");
                        }else if(response.data.error.status === "403"){
                            alert("La patente ingresada esta estacionada actualmente. Debe terminar su estadia y empezar una nueva");
                        }
                    }
                }
            }catch(error){
                console.log(error);
                alert("Ocurrió un error al añadir el registro.");
            }
        }
    }

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)} variant="success">Aparcar</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Nueva reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Patente</Form.Label>
                            <Form.Control type="text" placeholder="AB 123 CD" onChange={(input) => setLicensePlate(input.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => store()}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default StayAddButton;