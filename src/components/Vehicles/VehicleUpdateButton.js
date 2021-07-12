import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

function VehicleUpdateButton(props){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [LicensePlate, setLicensePlate] = useState(props.LicensePlate);
    const [VehicleType, setVehicleType] = useState(props.VehicleType);
    const [OptionsVehicleType, setOptionsVehicleType] = useState(null);    

    const update = async () => {
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
            const response = await Axios.put(REACT_APP_API_BASE_URL + "/vehicles/" + props.id,params, headers);
            if(response.status === 200){
                setShowModal(false);
                props.getVehicles();
                alert("El vehiculo se actualizó exitosamente.");
            }else{
                alert("Ocurrió un error al actualizar el registro.");
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
            <Button onClick={() => setShowModal(true)} className="mr-1" variant="warning">Actualizar</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Actualizar vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Patente</Form.Label>
                            <Form.Control type="text" placeholder="AB 123 CD" defaultValue={props.LicensePlate} onChange={(input) => setLicensePlate(input.target.value.toUpperCase())} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo de vehiculo</Form.Label>
                            <Form.Control as="select" defaultValue={props.VehicleType} onChange={(input) => setVehicleType(input.target.value)}>
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
                <Button variant="primary" onClick={() => update()}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default VehicleUpdateButton;