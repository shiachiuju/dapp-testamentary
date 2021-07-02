import React from "react"
import { Navbar, Container, Nav, Button, Form, Col, Row, DropdownButton} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'bootstrap';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import './layout.css';

export default ({ children }) => (
  <div>
    
    <Navbar class="navbar">
        <Container>
            <Nav className="mr-auto">
                <Nav.Link href="/">Main</Nav.Link>
                <DropdownButton variant="sencondary" id="dropdown-basic-button" title="Create">
                        <DropdownItem href="/Backup">Back-up</DropdownItem>
                        <DropdownItem href="/TestaManage">Testamentary</DropdownItem>
                </DropdownButton>
                <DropdownButton variant="light" id="dropdown-basic-button" title="Activate">
                        <DropdownItem href="/ActivateBackup">Back-up</DropdownItem>
                </DropdownButton>
            </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    Signed in as: <a href="https://beautygang.fr/">Beauty</a>
                    </Navbar.Text>
                </Navbar.Collapse>
        </Container>
    </Navbar>

    {children}

    <footer class="footer fixed-bottom">
        <div class="footer-copyright text-center py-3">© 2021 Copyright:
            <a> BeautyGang</a>
        </div>
    </footer>
    
  </div>
)