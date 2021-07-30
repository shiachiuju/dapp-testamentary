import React, { Component } from 'react'
import ReactBootstrap, { Button, Form, Col, Row } from 'react-bootstrap'
import sha256 from 'js-sha256';
import getWeb3 from '../getWeb3'
import '../App.css';
import Layout from '../layout';
import Axios from 'axios'
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
            message: ''
        }
        this.addHa = this.addHa.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    async addHa(mail,rate) {
        this.state.mainContract.methods.addbene(mail,rate).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            //this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
        })
        .then((mail,rate) => {
            submitBeneInfo(this.mail.value,this.rate.value)
            console.log('successfully deployed!');
            // console.log(this.state.account)
            // console.log(this.mail.value)
            // console.log(this.rate.value)
            this.refreshPage()
        }).catch((err) => {
            console.log(err);
        });
        
        const submitBeneInfo = (mail,rate) => {
            Axios.post('http://localhost:3002/api/add', {account_address: this.state.account, bene_mail: mail, bene_rate: rate})
            .then(() => {
                alert('success insert!')
            })
        }
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
        let {beneficiary} = this.state
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
            <Button variant="warning" onClick={this.addBene}>Add Beneficiary</Button>{
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
                                </div>
                            )
                        })
                    }        
            <br></br>
            </Form.Group>
            <Button variant="outline-warning"  onClick={(event) => {
                        event.preventDefault()
                        this.addHa(this.mail.value,this.rate.value)
                        }
                    }>Create</Button>
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