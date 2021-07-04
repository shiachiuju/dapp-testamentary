//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactBootstrap, { Navbar, Container, Nav, Button, Form, Col, Row,DropdownButton} from 'react-bootstrap'
// import createHash from 'crypto-browserify'
import sha256 from 'js-sha256';
//includes
import '../App.css';
import Layout from '../layout';
//contract
import { Backup_ABI, Backup_ADDRESS } from '../config_backup.js'
//components
import getWeb3 from '../getWeb3';
import { Dropdown } from 'bootstrap';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import {Email} from 'react-html-email';
//run backup
/* 設定備援機制帳號密碼的畫面，還會顯示使用者錢包、合約地址 */
class BackupCreatePage extends Component {
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
        const backupContract = new web3.eth.Contract(Backup_ABI, Backup_ADDRESS)
        this.setState({ backupContract })
        const contract_address = Backup_ADDRESS;
        this.setState({ contract_address })
    }
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.createBackup = this.createBackup.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        // this.sendEmail = this.sendEmail.bind(this);
    }
    async createBackup(email,password) {
        // this.stringPassword = password.toString()
        this.hash = sha256(password.toString())
        this.state.backupContract.methods.setBackup(email,this.hash).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            // this.sendEmail(email)
            // alert('Successfully created!')
            this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
            this.refreshPage()
      })}
    async refreshPage() { 
        window.location.reload()
    }
    // src="https://smtpjs.com/v3/smtp.js"
    // async sendEmail(email){
    //     let mailaddress = email;
    //     // let receiver = document.getElementById('name').value;

    //     Email.send({
    //     SecureToken : "d087ae4a-9ee1-4235-9dc0-d78d2f9c2c3f",
    //     //Host : "smtp.gmail.com",
    //     //Username : "beautygang4@gmail.com",
    //     //Password : "863E168A69C2DF10621C640866D905E1B4ED",
    //     //Password : "beauty4444",
    //     To : mailaddress,
    //     //document.getElementById("demo").innerHTML = mailaddress,
    //     //'c890713love@gmail.com''ctchanjudy@gmail.com''yuzhenchen922@gmail.com''chiu338920@gmail.com',
        
    //     From : "beautygang4@gmail.com",
    //     Subject : "美麗幫-備援機制建立",
    //     Body : "<b>hey!</b>"+"<b> your back-up mechanism is established.</b><p><br><b>Please don't forget your Password so that you can activate it successfully.</b>"
    //     //"<b>Dear</b>+ 'name' +<p><br><b>想請問您6/25日下午2點是否有空跟我們meeting</b><p><br><b>Best regards</b><br><b>美麗幫 昱臻、筑婷、可親、秋如</b>"
    //     }).once('receipt', (receipt) => {
    //         this.refreshPage()
    //     }).then(
    //         message => alert(message)
    //     );
    // }
    render() {
        return (
            <Layout>
            <div className="App">
                <br></br>
                <h3><b>Create Back-up Mechanism</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                <p></p>
                <div id="setback">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        if (this.password.value == this.checkpassword.value){
                            this.createBackup(this.email.value,this.password.value)
                        }else{
                            alert('Please check the password again. The password is not confirmed.')
                        }
                    }}>
                        <Form.Group id="formBasicEmail">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Email address</b></Form.Label>
                                    <Form.Control
                                        type="email" 
                                        ref={(input) => { 
                                            this.email = input
                                        }}
                                        placeholder="example@email.com"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <p></p>
                        <Form.Group id="formBasicPassword" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control 
                                        type="password"
                                        ref={(input) => { 
                                            this.password = input
                                        }}  
                                        placeholder="must have at least 6 characters"
                                        minlength="6"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <p></p>
                        <Form.Group id="formBasicPassword" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Confirm Password</b></Form.Label>
                                    <Form.Control 
                                        type="password"
                                        ref={(input) => { 
                                            this.checkpassword = input
                                        }}  
                                        placeholder="confirm password again"
                                        minlength="6"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="outline-warning">Create</Button>
                    </Form>
                </div>
                <p></p>
                <p><b>Contract address:</b> {this.state.contract_address}</p>
                <p>{this.state.message}</p>
            </div>
            </Layout>
        ) 
    }
}
export default BackupCreatePage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
                <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
                <Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/