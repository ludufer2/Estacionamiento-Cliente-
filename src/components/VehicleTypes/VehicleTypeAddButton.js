import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

function VehicleTypeAddButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [Name, setName] = useState('');
    const [Pay, setPay] = useState(true);
    const [RatePerMinute, setRatePerMinute] = useState(0);
    const [PaymentFrequency, setPaymentFrequency] = useState(null);
    const [OptionsPaymentFrequency, setOptionsPaymentFrequency] = useState(null);   
    const [ShowPaymentFrequency, setShowPaymentFrequency] = useState('block'); 

    const toggleCheckbox = () => {
        if(Pay){
            setPay(false);
            setShowPaymentFrequency('none');
            setRatePerMinute(0);
        }else{
            setPay(true);
            setShowPaymentFrequency('block');
        }
    }

    const store = async () => {
        var error = false;
        if(Name === ""){
            error = true;
        }

        if(RatePerMinute === ""){
            error = true;
        }

        if(Pay){
            if(PaymentFrequency === null){
                error = true;
            }
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
            const response = await Axios.post(REACT_APP_API_BASE_URL + "/vehicletypes",params, headers);
            if(response.status === 201){
                setShowModal(false);
                setName('');
                setPay(true);
                setRatePerMinute(0);
                setPaymentFrequency(null);
                props.setVehicleTypes([...props.VehicleTypes, response.data]);
                alert("El tipo de vehiculo se añadió exitosamente.");
            }else{
                alert("Ocurrió un error al añadir el registro.");
            }
        }
    }

    useEffect(async () => {
        setOptionsPaymentFrequency(props.PaymentFrequencies.map(element => {
            return <option key={element.id} value={element.id}>{element.name}</option>
        }));
    },[props.PaymentFrequencies]);

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)}>Nuevo Tipo de vehiculo</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Nuevo tipo de vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Oficial" onChange={(input) => setName(input.target.value)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group key="pay">
                                    <Form.Label></Form.Label>
                                    <Form.Check type="checkbox" label="Paga la tarifa" id="pay" onClick={() => toggleCheckbox()} defaultChecked={Pay} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Tarifa por minuto</Form.Label>
                                    <Form.Control type="number" placeholder="5.00" min={0} step="0.1" onChange={(input) => setRatePerMinute(input.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className={`d-${ShowPaymentFrequency}`}>
                            <Form.Label>Frecuencia de pago</Form.Label>
                            <Form.Control as="select" onChange={(input) => setPaymentFrequency(input.target.value)}>
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
                <Button variant="primary" onClick={() => store()}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default VehicleTypeAddButton;