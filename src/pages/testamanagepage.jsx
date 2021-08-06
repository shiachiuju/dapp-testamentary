import React, { Component } from 'react'
import ReactBootstrap, { Button, Form, Col, Row } from 'react-bootstrap'
import sha256 from 'js-sha256';
import getWeb3 from '../getWeb3'
import '../App.css';
import Layout from '../layout';
import Axios from 'axios'
//import { MainContract_ABI, MainContract_ADDRESS } from '../config_maincontract';
import MainContract from '../contract/MainContract.json'
import emailjs, { init } from 'emailjs-com';
init("user_hGl6i7zIJBqfYWp8WEBfY");

class TestaManagePage extends Component{
    
    componentDidMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        //web3
        const web3 = await getWeb3();
        this.setState({ web3: web3})
        //wallet accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        //contract address
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        .then((con) => {
            const mainContract = new web3.eth.Contract(MainContract.abi, con.data[0].maincontract_address.toString())
            this.setState({ mainContract });
            this.getinfo();
            this.setState({ contract_address: con.data[0].maincontract_address.toString()})
            console.log(con.data[0].maincontract_address);
        }).catch((err) => {
            console.log(err);
        });

    }

    async getinfo(){
        const balance = await this.state.mainContract.methods.getBalance().call()
        this.setState({ balance })
        const owners = await this.state.mainContract.methods.getOwners().call()
        this.setState({ owners })
        const email = await this.state.mainContract.methods.getEmail().call()
        this.setState({ email })
        const password = await this.state.mainContract.methods.getPassword().call()
        this.setState({ password })
        if (this.state.email != '' ){
            this.setState({ backup : 'The backup mechanism has been set.'})
        }

    }

    constructor(props) {
        super(props)
        this.state = {
            beneficiary:[{mail:"",rate:""}],
            message: ''
        }
        this.addHa = this.addHa.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    async addHa(mail, rate) {
        this.sendEmailtoB(this.mail.value)
        this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!' })
        this.state.mainContract.methods.addbene(mail,rate).send({ from: this.state.account })
            .once('receipt', (receipt) => {
            //this.sendEmailtoB(this.mail.value)
            //this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!' })
        })
        .then((mail,rate) => {

            submitBeneInfo(this.mail.value,this.rate.value)
            console.log('successfully deployed!');
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
    handleSubmit = (e) => { e.preventDefalut() }

    sendEmailtoB(e) {
        let service_id = "beautygang";
        let template_id = "testamentary";
        let name = e.split('@')[0];
        let testamen = this.state.account;

        emailjs.send(service_id, template_id, {
            to_name: name,
            email: e,
            message: "Here to notify that you have been set as one of " + testamen + "'s beneficiaries.",
            subject: 'Notification'
        });
        this.setState({ message: "We have sent an e-mail to your beneficiary's mailbox, please check it out!" })

    }

    sendEmailtoT(e) {
        let service_id = "beautygang";
        let template_id = "testamentary";
        let testamen = this.state.account;

        emailjs.send(service_id, template_id, {
            to_name: testamen,
            userMail: e,
            message: "Your testamentary has been set.",
            subject: "Notification"
        });
        this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!' })

    }

    checkEmail = (email) => {

        // checkemail
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            // this is a valid email address
            return true
        }
        else {
            // invalid email, show an error to the user.
            return false
        }

    }

    render() {
        let {beneficiary} = this.state
        return (
        <Layout>
            <div className="App">
            <br></br>
            <h3><b>Create Testament</b></h3>
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
                        <Button variant="outline-warning" onClick={(event) => {
                            event.preventDefault()
                            if (this.checkEmail(this.mail.value) == true) {
                                //this.sendEmailtoB(this.mail.value)
                                this.addHa(this.mail.value, this.rate.value)
                             
                            } else if (this.checkEmail(this.mail.value) != true) {
                                alert('Please enter correct email!')
                            }
                        }}>Create</Button>
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