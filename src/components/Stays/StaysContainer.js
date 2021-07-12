import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import StayAddButton from './StayAddButton';
import Stay from './Stay';

function StaysContainer(props){
    const [ItemStay, setItemStay] = useState([]);

    useEffect(() => {
        setItemStay(props.Stays.map(element => {
            return  <Stay id={element.id} vehicle={element.vehicle} start_date_time={element.start_date_time} getStays={props.getStays} />
        }));
    },[props.Stays]);

    return(
        <React.Fragment>
            <Row>
                <Col>
                <h3>Vehiculos estacionados</h3>
                </Col>
            </Row>
            <Row>
                {ItemStay}
                <StayAddButton Stays={props.Stays} setStays={props.setStays} />
            </Row>
        </React.Fragment>
    );
}

export default StaysContainer;