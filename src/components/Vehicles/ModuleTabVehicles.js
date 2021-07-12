import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import VehicleUpdateButton from './VehicleUpdateButton'
import VehicleDeleteButton from './VehicleDeleteButton'

function ModuleTabVehicles(props){
    const [OptionsVehicles,setOptionsVehicles] = useState([]);

    useEffect(() => {
        setOptionsVehicles(props.Vehicles.map(element => {
            return <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.license_plate}</td>
                        <td>{element.vehicle_type.name}</td>
                        <td>
                            <VehicleUpdateButton id={element.id} VehicleTypes={props.VehicleTypes} LicensePlate={element.license_plate} VehicleType={element.vehicle_type_id} getVehicles={props.getVehicles} />
                            <VehicleDeleteButton id={element.id} LicensePlate={element.license_plate} getVehicles={props.getVehicles} />
                        </td>
                    </tr>;
        }));
    },[props.Vehicles]);

    return(
        <React.Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patente</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {OptionsVehicles}
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default ModuleTabVehicles;