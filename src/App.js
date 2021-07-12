import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import Header from './components/common/Header';
import VehicleTypeAddButton from './components/VehicleTypes/VehicleTypeAddButton';
import VehicleAddButton from './components/Vehicles/VehicleAddButton';
import StartMonth from './components/StartMonth';
import PaymentReport from './components/PaymentReport';
import StaysContainer from './components/Stays/StaysContainer';
import ModuleTabs from './components/Modules/ModuleTabs';

function App() {
  const { REACT_APP_API_BASE_URL } = process.env;
  const [PaymentFrequencies, setPaymentFrequencies] = useState([]);
  const [VehicleTypes, setVehicleTypes] = useState([]);
  const [Vehicles, setVehicles] = useState([]);
  const [Stays, setStays] = useState([]);

  const getPaymentFrequencies = async () => {
    await Axios.get(REACT_APP_API_BASE_URL + "/paymentfrequencies").then(function(response){
        if(response.status === 200){
          setPaymentFrequencies(response.data);
        }
    });
  }

  const getVehicleTypes = async () => {
    await Axios.get(REACT_APP_API_BASE_URL + "/vehicletypes").then(function(response){
        if(response.status === 200){
            setVehicleTypes(response.data);
        }
    });
  }

  const getVehicles = async () => {
    await Axios.get(REACT_APP_API_BASE_URL + "/vehicles").then(function(response){
        if(response.status === 200){
          setVehicles(response.data);
        }
    });
  }

  const getStays = async () => {
    await Axios.get(REACT_APP_API_BASE_URL + "/stays/stay_uncompleted").then(function(response){
        if(response.status === 200){
          setStays(response.data);
        }
    });
  }

  useEffect(async () => {
    await getPaymentFrequencies();
    await getVehicleTypes();
    await getVehicles();
    await getStays();
  },[]);

  return (
    <React.Fragment>
        <Header />
        <Container fluid className="mt-3">
            <Row>
                <Col></Col>
                <Col><VehicleTypeAddButton setVehicleTypes={setVehicleTypes} VehicleTypes={VehicleTypes} setPaymentFrequencies={setPaymentFrequencies} PaymentFrequencies={PaymentFrequencies} getPaymentFrequencies={getPaymentFrequencies} /></Col>
                <Col><VehicleAddButton setVehicles={setVehicles} Vehicles={Vehicles} VehicleTypes={VehicleTypes} /></Col>
                <Col><StartMonth /></Col>
                <Col><PaymentReport /></Col>
                <Col></Col>
            </Row>
            <Row className="mt-5">
              <Col lg={4}>
                <ModuleTabs PaymentFrequencies={PaymentFrequencies} VehicleTypes={VehicleTypes} Vehicles={Vehicles} getPaymentFrequencies={getPaymentFrequencies} getVehicleTypes={getVehicleTypes} getVehicles={getVehicles}  />
              </Col>
              <Col>
                <StaysContainer Stays={Stays} setStays={setStays} getStays={getStays}/>
              </Col>
            </Row>
        </Container>
    </React.Fragment>
  );
}

export default App;
