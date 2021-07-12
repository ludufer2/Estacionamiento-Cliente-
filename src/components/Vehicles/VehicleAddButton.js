import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

function VehicleAddButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [LicensePlate, setLicensePlate] = useState('');
    const [VehicleType, setVehicleType] = useState(null);
    const [OptionsVehicleType, setOptionsVehicleType] = useState(null);    

    const store = async () => {
        var error = false;
        if(LicensePlate === ""){
            error = true;
        }

        if(VehicleType === null || typeof VehicleType === "undefined" || VehicleType === "Seleccionar..."){
            error = true;
        }

        if(error){
            alert("Alguno de los campos no se completo");
        }else{
            var headers = {};
            headers["Content-Type"] = "application/json";

            var params = {};
            params.license_plate = LicensePlate.toUpperCase().replaceAll(' ','');
            params.vehicle_type_id = VehicleType;
            const response = await Axios.post(REACT_APP_API_BASE_URL + "/vehicles",params, headers);
            if(response.status === 201){
                setShowModal(false);
                setLicensePlate('');
                props.setVehicles([...props.Vehicles, response.data]);
                alert("El vehiculo se añadió exitosamente.");
            }else{
                alert("Ocurrió un error al añadir el registro.");
            }
        }
    }

    useEffect(async () => {
        setOptionsVehicleType(props.VehicleTypes.map(element => {
            return <option key={element.id} value={element.id}>{element.name}</option>
        }));
    },[props.VehicleTypes]);

    return(
        <React.Fragment>
            <Button onClick={() => setShowModal(true)}>Nuevo vehiculo</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Nuevo vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Patente</Form.Label>
                            <Form.Control type="text" placeholder="AB 123 CD" onChange={(input) => setLicensePlate(input.target.value.toUpperCase())} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo de vehiculo</Form.Label>
                            <Form.Control as="select" onChange={(input) => setVehicleType(input.target.value)}>
                                <option>Seleccionar...</option>
                                {OptionsVehicleType}
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

export default VehicleAddButton;