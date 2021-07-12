import React from "react";
import { Tabs,Tab } from 'react-bootstrap';
import ModuleTabVehicleTypes from "../VehicleTypes/ModuleTabVehicleTypes";
import ModuleTabVehicles from "../Vehicles/ModuleTabVehicles";

function ModuleTabs(props){
    return(
        <React.Fragment>
            <Tabs defaultActiveKey="vehicleTypes">
                <Tab eventKey="vehicleTypes" title="Tipos de vehiculos">
                    <ModuleTabVehicleTypes PaymentFrequencies={props.PaymentFrequencies} VehicleTypes={props.VehicleTypes} getPaymentFrequencies={props.getPaymentFrequencies} getVehicleTypes={props.getVehicleTypes} />
                </Tab>
                <Tab eventKey="vehicles" title="Vehiculos">
                    <ModuleTabVehicles Vehicles={props.Vehicles} VehicleTypes={props.VehicleTypes} getVehicles={props.getVehicles} />
                </Tab>
            </Tabs>
        </React.Fragment>
    );
}

export default ModuleTabs;