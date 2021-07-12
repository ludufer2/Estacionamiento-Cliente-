import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import VehicleTypeUpdateButton from './VehicleTypeUpdateButton';
import VehicleTypeDeleteButton from './VehicleTypeDeleteButton';

function ModuleTabVehicleTypes(props){
    const [OptionsVehicleTypes,setOptionsVehicleTypes] = useState([]);

    useEffect(() => {
        setOptionsVehicleTypes(props.VehicleTypes.map(element => {
            return <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>
                        <VehicleTypeUpdateButton PaymentFrequencies={props.PaymentFrequencies} id={element.id} Name={element.name} Pay={element.pay} RatePerMinute={element.rate_per_minute} payment_frequency_id={element.payment_frequency_id} getVehicleTypes={props.getVehicleTypes} getVehicleTypes={props.getVehicleTypes} />
                        <VehicleTypeDeleteButton id={element.id} Name={element.name} getVehicleTypes={props.getVehicleTypes} />
                    </td>
                </tr>;
        }));
    },[props.VehicleTypes]);
    return(
        <React.Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {OptionsVehicleTypes}
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default ModuleTabVehicleTypes;