import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment/locale/es-mx';
import EndStayButton from './EndStayButton';

function Stay(props){
    return(
        <React.Fragment>
            <Col lg={3} key={props.id} className="mt-3 mb-3">
                <Card>
                    <Card.Body>
                        <Card.Title>{props.vehicle.license_plate}</Card.Title>
                        <Card.Text>
                        {props.vehicle.vehicle_type.name}
                        <br />
                        <h6 className="text-muted"><Moment date={props.start_date_time} fromNow /></h6>
                        </Card.Text>
                        <EndStayButton id={props.id} vehicle={props.vehicle} getStays={props.getStays} />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Stay;