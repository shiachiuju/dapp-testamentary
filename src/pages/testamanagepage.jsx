import React, { Component } from 'react'
import ReactBootstrap, { Button, Form, Col, Row } from 'react-bootstrap'
import sha256 from 'js-sha256';
import getWeb3 from '../getWeb3'
import '../App.css';
import Layout from '../layout';
import { MainContract_ABI, MainContract_ADDRESS } from '../config_maincontract';

class TestaManagePage extends Component{
    //state={
        //beneficiary:[{mail:"",rate:""}],
    //}
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
        //const backupContract = new web3.eth.Contract(Backup_ABI, Backup_ADDRESS)
        //this.setState({ backupContract })
        //const contract_address = Backup_ADDRESS;
        //this.setState({ contract_address })
        //main contract
        const mainContract = new web3.eth.Contract(MainContract_ABI, MainContract_ADDRESS)
        this.setState({ mainContract })
        const contract_address = MainContract_ADDRESS;
        this.setState({ contract_address })
        
        //view contract data
        const balance = await mainContract.methods.getBalance().call()
        this.setState({ balance })
    }
    constructor(props) {
        super(props)
        this.state = {
            //beneficiary:[{mail:"",rate:""}],
            message: ''
        }
        this.addHa = this.addHa.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    async addHa(mail,rate) {
        this.state.mainContract.methods.addbene(mail,rate).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
            this.refreshPage()
    })}

    async refreshPage() { 
        window.location.reload()
    }
    addBene=(e)=>{
        this.setState((prevState)=>({
           beneficiary:[...prevState.beneficiary,{mail:"",rate:""}] 
        }))
    }
    handleSubmit=(e)=>{e.preventDefalut()}
    render() {
        return (
            
        <Layout>
            <div className="App">
            <br></br>
            <h1><b>Create Testamentary</b></h1>
            <br></br>
            <p><b>Wallet account:</b> {this.state.account}</p>
            <p><b>Contract address:</b> {this.state.contract_address} </p>
            <p><b>Contract balance:</b> {this.state.balance / 10**18} ether </p>
            <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.addHa(this.mail.value,this.rate.value)
                        }
                    }>
            <p></p>
            <Form.Group id="formBeneEmail">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Please enter your bene's email address</b></Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={(input) => { 
                                            this.mail = input
                                        }} 
                                        placeholder="Enter bene email"
                                        required />
                                </Col>
                            </Row>
            </Form.Group>
            <p></p>
            <Form.Group id="formBasicEmail" onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Please enter your bene rate</b></Form.Label>
                                    <Form.Control
                                        type="number"
                                        ref={(input) => { 
                                            this.rate = input
                                        }}
                                        placeholder="Enter rate"
                                        required />
                                </Col>
                            </Row>
            </Form.Group>
            <br></br>
            <Button type="submit" variant="outline-warning">Create</Button>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            </div>
             
        </Layout>
        ) 
    }
}
export default TestaManagePage