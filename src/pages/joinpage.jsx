//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactBootstrap, { NavbPar, Container, Nav, Button, Form, Col, Row,DropdownButton} from 'react-bootstrap'
import sha256 from 'js-sha256';
//includes
import '../App.css';
import Layout from '../layout';
//contract
//import { Activatebackup_ABI, Activatebackup_ADDRESS } from '../config_activatebackup.js'
//components
import getWeb3 from '../getWeb3';
import { Dropdown } from 'bootstrap';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
//run activatebackup
/* 取回合約錢的畫面，還會顯示使用者錢包、合約地址(檢查用) */
class JoinPage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
    }
    async loadBlockchainData() {
        //web3
        const web3 = await getWeb3();
        //netid
        const netId = await web3.eth.net.getId();
        this.setState({ netid: netId })
        //wallet accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        //backup contract
        // const acBackupContract = new web3.eth.Contract(Activatebackup_ABI, Activatebackup_ADDRESS)
        // this.setState({ acBackupContract })
        // const contract_address = Activatebackup_ADDRESS;
        // this.setState({ contract_address })
    }
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    async refreshPage() { 
        window.location.reload()
    }
    render() {
        return (
            <Layout>
            <div className="App">
                <br></br>
                <br></br>
                <Col md={{ span: 6 }}><p><b>About us:</b></p></Col>
                <Col md={{ span: 6 , offset: 3 }}>
                <p>What if we lose our password for crypto wallet?</p>
                <p>What if we die without making our testamentary?</p>
                <p>All the cryptocurrency we gained will become meaningless.</p>     
                <p>Here, we can protect your cryptocurrency from losing or wasting.</p>
                </Col>
                <br></br>
                <p><b>Press join to start your own testamentary trust mechanism.</b></p>
                <br></br>
                <Button size="lg" href="/Main" variant="outline-warning">Join !</Button>
            </div>
            </Layout> 
        ) 
    }
}
export default JoinPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/