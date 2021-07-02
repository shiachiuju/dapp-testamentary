//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'

import sha256 from 'js-sha256';
//includes
import '../App.css';
//contract
import { Activatebackup_ABI, Activatebackup_ADDRESS } from '../config_activatebackup.js'
//components
import getWeb3 from '../getWeb3';
import Layout from '../layout';


//run activatebackup
/* 取回合約錢的畫面，還會顯示使用者錢包、合約地址(檢查用) */
class ActivateTestamentPage extends Component {
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
        const acBackupContract = new web3.eth.Contract(Activatebackup_ABI, Activatebackup_ADDRESS)
        this.setState({ acBackupContract })
        const contract_address = Activatebackup_ADDRESS;
        this.setState({ contract_address })
    }
    constructor(props) {
        super(props)
        this.state = {
        }
        this.CheckContract = this.CheckContract.bind(this);

    }
    async CheckContract(contractadd,checkemail,checkpassword) {
        this.checkhash = sha256(checkpassword.toString())
        this.state.acBackupContract.methods.checkContract(contractadd,checkemail,this.checkhash).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.refreshPage()
        }).once('error', (error) => {
            // alert('請輸入正確地址');
    })}
    async refreshPage() { 
        window.location.reload()
    }
    render() {
        return (
        <Layout>
            <div className="App">
                <br></br>
                <h3><b>Activate Testament Mechanism</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                <p><b>*Contract address:</b> {this.state.contract_address}</p>
                <br></br>
                <div id="activateBack">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.CheckContract(this.contractadd.value,this.checkemail.value,this.checkpassword.value)
                    }}>
                        <Form.Group id="formCheckAddress">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Back-up contract address</b></Form.Label>
                                    <Form.Control
                                        type="text" 
                                        ref={(input) => { 
                                            this.contractadd = input
                                        }}
                                        placeholder="Enter back-up address"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Form.Group id="formCheckEmail">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Email address</b></Form.Label>
                                    <Form.Control
                                        type="email" 
                                        ref={(input) => { 
                                            this.checkemail = input
                                        }}
                                        placeholder="Enter email"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Form.Group id="formCheckPassword" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control 
                                        type="password"
                                        ref={(input) => { 
                                            this.checkpassword = input
                                        }}  
                                        placeholder="Password"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="outline-secondary">Activate</Button>
                    </Form>
                </div>
            </div> 
        </Layout>
        ) 
    }
}
export default ActivateTestamentPage;