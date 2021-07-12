import React, { useState } from "react";
import Axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { saveAs } from 'file-saver';

function PaymentReport(){
    const { REACT_APP_API_BASE_URL } = process.env;
    const [ShowModal, setShowModal] = useState(false);
    const [FileName, setFileName] = useState('Sin titulo');

    const generate_payment_report = async () => {
        var headers = {};
        headers["Content-Type"] = "application/json";

        var params = {};
        try{
            const response = await Axios.get(REACT_APP_API_BASE_URL + "/vehicles/generate_payment_report",params, headers);
            if(response.status === 200){
                var TextPayments = "";
                TextPayments += "Num. Placa\t Tiempo estacionado (min.)\t Cantidad a pagar\n";
                response.data.vehicle_types.map(vehicle_type => {
                    vehicle_type.vehicles.map(vehicle => {
                        TextPayments += vehicle.license_plate + "\t " + vehicle.minute_counter + "\t " + vehicle.minute_counter * vehicle_type.rate_per_minute + "\n";
                    });
                });
                var blob = new Blob([TextPayments],{ type: "text/plain;charset=utf-8" });
                saveAs(blob, FileName + ".txt");
                setShowModal(false);
            }
        }catch(error){
            console.log(error);
            alert("Ocurrió un error al generar el reporte de pagos.");
        }
    }

    return(
        <React.Fragment>
            <Button  onClick={() => setShowModal(true)}>Reporte de pagos</Button>

            <Modal show={ShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Generar reporte de pagos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Sin titulo" onChange={(input) => setFileName(input.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => generate_payment_report()}>
                    Generar
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default PaymentReport;