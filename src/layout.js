import React from "react"
import { Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import './layout.css';

export default ({ children }) => (
  <div>
    
    <Navbar class="navbar">
        <Container>
            <Nav className="mr-auto">
            <Nav.Link href="/">Main</Nav.Link>
            <Nav.Link href="/Backup">Create</Nav.Link>
            <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
            </Nav>
            <Navbar.Toggle />
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