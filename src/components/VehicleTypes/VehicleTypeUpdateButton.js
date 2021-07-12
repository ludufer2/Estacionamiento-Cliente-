import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

function VehicleTypeUpdateButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [Name, setName] = useState(props.Name);
    const [Pay, setPay] = useState(props.Pay === 1 ? true : false);
    const [RatePerMinute, setRatePerMinute] = useState(props.RatePerMinute);
    const [PaymentFrequency, setPaymentFrequency] = useState(props.payment_frequency_id);
    const [OptionsPaymentFrequency, setOptionsPaymentFrequency] = useState([]);
    const [ShowPaymentFrequency, setShowPaymentFrequency] = useState('block'); 

    const toggleCheckbox = () => {
        if(Pay){
            setPay(false);
            setShowPaymentFrequency('block');
            setRatePerMinute(0);
        }else{
            setPay(true);
            setShowPaymentFrequency('none');
        }
    }

    const update = async () => {
        var error = false;
        if(Name === ""){
            error = true;
        }

        if(RatePerMinute === ""){
            error = true;
        }

        if(error){
            alert("Alguno de los campos no se completo");
        }else{
            var headers = {};
            headers["Content-Type"] = "application/json";

            var params = {};
            params.name = Name;
            params.pay = Pay ? 1 : 0;
            params.rate_per_minute = Pay ? RatePerMinute : 0;
            params.payment_frequency_id = PaymentFrequency;
            const response = await Axios.put(REACT_APP_API_BASE_URL + "/vehicletypes/" + props.id,params, headers);
            if(response.status === 200){
                setShowModal(false);
                props.getPaymentFrequencies();
                alert("El tipo de vehiculo se actualizó exitosamente.");
            }else{
                alert("Ocurrió un error al actualizar el registro.");
            }
        }
    }

    useEffect(async () => {
        setOptionsPaymentFrequency(props.PaymentFrequencies.map(element => {
            return <option key={element.id} value={element.id}>{element.name}</option>
        }));
        toggleCheckbox();
    },[props.PaymentFrequencies]);

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)} className="mr-1" variant="warning">Actualizar</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Actualizar tipo de vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Oficial" defaultValue={props.Name} onChange={(input) => setName(input.target.value)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group key="pay">
                                    <Form.Label></Form.Label>
                                    <Form.Check type="checkbox" label="Paga la tarifa" id="pay" defaultValue={props.Pay} onClick={() => toggleCheckbox()} defaultChecked={props.Pay === 1 ? true : false} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Tarifa por minuto</Form.Label>
                                    <Form.Control type="number" placeholder="5.00" min={0} step="0.1" defaultValue={props.RatePerMinute} onChange={(input) => setRatePerMinute(input.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className={`d-${ShowPaymentFrequency}`}>
                            <Form.Label>Frecuencia de pago</Form.Label>
                            <Form.Control as="select" defaultValue={props.payment_frequency_id} onChange={(input) => setPaymentFrequency(input.target.value)}>
                                <option>Seleccionar...</option>
                                {OptionsPaymentFrequency}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => update()}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default VehicleTypeUpdateButton;