import React from "react"
import { Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
document.body.style = 'background-color:#faf0e6;';


export default ({ children }) => (
    
  <div>
    
    <Navbar class="navbar">
        <Container>
            <Nav className="mr-auto">
                <Nav.Link href="/"><div><FontAwesomeIcon icon={["fas", "apple-alt"]}/>platform</div></Nav.Link>
                <Nav.Link href="/Main"><div class="w">Create</div></Nav.Link>
                <Nav.Link href="/ActivateMain"><div class="w">Activate</div></Nav.Link>

                {/* <DropdownButton variant="sencondary" id="dropdown-basic-button" title="Back-up">
                        <DropdownItem href="/Backup">Create</DropdownItem>
                        <DropdownItem href="/ActivateBackup">Activate</DropdownItem>
                </DropdownButton>
                &nbsp;
                <DropdownButton variant="" id="dropdown-basic-button" title="Testament">
                        <DropdownItem href="/TestaManage">Manage</DropdownItem>
                        <DropdownItem href="/SetTestament">Set</DropdownItem>
                        <DropdownItem href="/ActivateTestament">Acvtivate</DropdownItem>
                </DropdownButton> */}
            </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text><div class="w">
                    Signed in as: Beauty
                    </div></Navbar.Text>
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