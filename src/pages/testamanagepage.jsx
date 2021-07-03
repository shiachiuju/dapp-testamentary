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
            beneficiary:[{mail:"",rate:""}],
        }
        //this.createBackup = this.createBackup.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        // this.sendEmail = this.sendEmail.bind(this);
    }
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
        let {beneficiary}=this.state
        return (
        <Layout>
            <div className="App">
            <br></br>
            <h1><b>Create Testamentary</b></h1>
            <br></br>
            <p><b>Wallet account:</b> {this.state.account}</p>
            <p><b>Contract address:</b> {this.state.contract_address} </p>
            <p><b>Contract balance:</b> {this.state.balance / 10**18} ether </p>
            <Form>
            <Form.Group id="formBasicEmail" onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Please enter your email address</b></Form.Label>
                                    <Form.Control
                                        type="email" 
                                        placeholder="Enter email"
                                        required />
                                </Col>
                            </Row>
                            <br></br>
                            <Button variant="warning" onClick={this.addBene}>Add More Beneficiary</Button>{
                                beneficiary.map((val,idx)=>{
                                    let beneficiaryId='beneficiary-${idx}',rateId='rate-${idx}'
                                    return(
                                        <div key={idx}>
                                            <br></br>
                                            <label htmlFor={beneficiaryId}>#{idx+1} Beneficiary Email:</label>
                                            &nbsp;
                                            <input
                                            type="email"
                                            size='30'
                                            name={beneficiaryId}
                                            data-id={idx}
                                            id={beneficiaryId}
                                            placeholder="Enter email"
                                            className="mail"/>
                                            &nbsp;&nbsp;&nbsp;
                                            <label htmlFor={rateId}>Distribution rate:</label>
                                            &nbsp;
                                            <input
                                            type="number"
                                            name={rateId}
                                            data-id={idx}
                                            id={rateId}
                                            placeholder="0~100"
                                            className="rate"/>
                                            &nbsp;&nbsp;
                                            <Button variant="warning">Add</Button>
                                        </div>
                                    )
                                })
                    }        <br></br>
                        </Form.Group>
                        <Button variant="outline-warning" type="submit">Submit</Button>
                        <br></br>
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