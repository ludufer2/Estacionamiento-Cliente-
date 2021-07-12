import React, { useState } from "react";
import Axios from 'axios';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

function EndStayButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [ShowTextAfterPayment, setShowTextAfterPayment] = useState('none');
    const [ShowTextBeforePayment, setShowTextBeforePayment] = useState('block');
    const [TextCancelButton, setTextCancelButton] = useState('Cancelar');
    const [ShowFinishButton, setShowFinishButton] = useState('block');
    const [Total, setTotal] = useState(0);
    const [Minutes, setMinutes] = useState(0);

    const end = async () => {
        var headers = {};
        headers["Content-Type"] = "application/json";

        var params = {};
        try{
            const response = await Axios.put(REACT_APP_API_BASE_URL + "/stays/end/" + props.id,params, headers);
            if(response.status === 200){
                if(response.data.total !== null && response.data.total > 0){
                    setShowTextAfterPayment('block');
                    setShowTextBeforePayment('none');
                    setTotal(response.data.total);
                    setMinutes(response.data.minutes);
                    setTextCancelButton('Aceptar');
                    setShowFinishButton('none');
                }else{
                    setShowModal(false);
                    props.getStays();
                    alert("El aparcamiento finalizó exitosamente.");
                }
            }
        }catch(error){
            console.log(error);
            alert("Ocurrió un error al finalizar el registro.");
        }
    }

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)} variant="dark">Finalizar</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Finalizar aparcamiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={`d-${ShowTextAfterPayment}`}>
                        <Form.Group>
                            <Form.Label>El total para el vehiculo <b>{props.vehicle.license_plate}</b> es: ${Total} por {Minutes} minutos.</Form.Label>
                        </Form.Group>
                    </Form>
                    <Form className={`d-${ShowTextBeforePayment}`}>
                        <Form.Group>
                            <Form.Label>¿Desea finalizar el aparcamiento del vehiculo <b>{props.vehicle.license_plate}</b>?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    {TextCancelButton}
                </Button>
                <Button className={`d-${ShowFinishButton}`} variant="primary" onClick={() => end()}>
                    Terminar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default EndStayButton;