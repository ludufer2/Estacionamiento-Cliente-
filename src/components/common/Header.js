import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from '../../assets/images/logo.png';

function Header(){
    return(
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top mr-2" />
                Estacionamiento
                </Navbar.Brand>
            </Navbar>
        </React.Fragment>
    );
}

export default Header;