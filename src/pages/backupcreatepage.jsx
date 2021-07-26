//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
import sha256 from 'js-sha256';
//includes
import '../App.css';
import Layout from '../layout';
//contractabi
import Backup from '../contract/Backup.json'
//components
import getWeb3 from '../getWeb3';
import emailjs, { init } from 'emailjs-com';
init("user_hGl6i7zIJBqfYWp8WEBfY");


//run backup
/* 設定備援機制帳號密碼的畫面，還會顯示使用者錢包、合約地址 */
class BackupCreatePage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
    }
    async loadBlockchainData() {
        //web3
        const web3 = await getWeb3();
        this.setState({ web3: web3 })
        //wallet accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        //contract address
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getbackupcontract/${acc}`)
        .then((con) => {
            const backupContract = new web3.eth.Contract(Backup.abi, con.data[0].backupcontract_address.toString())
            this.setState({ backupContract });
            this.setState({ contract_address: con.data[0].backupcontract_address.toString()})
            console.log(con.data[0].backupcontract_address);
        }).catch((err) => {
            Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
            .then((con) => {
                console.log(con.data[0].maincontract_address);
                this.Deploy(con.data[0].maincontract_address)
            }).catch((err) => {
            });
        });
    }
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.createBackup = this.createBackup.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }
    async createBackup(email,password) {
        this.hash = sha256(password.toString())
        this.state.backupContract.methods.setBackup(email,this.hash).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.sendEmail(email)
            this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
            // this.refreshPage()
      })}
    async refreshPage() { 
        window.location.reload()
    }
    async Deploy(mainaddr) {
        const contract = new this.state.web3.eth.Contract(Backup.abi);
        contract.deploy({
            data: Backup.bytecode,
            arguments: [mainaddr]
        })
        .send({
            from: this.state.account,
            gas: 2100000,
        })
        .then((newContractInstance) => {
            console.log('successfully deployed!');
            console.log(newContractInstance.options.address);
            submitNew(mainaddr,newContractInstance.options.address.toString())
            this.refreshPage()
        }).catch((err) => {
            console.log(err);
        });
        const submitNew = (mainaddr,newcontract) => {
            Axios.post('http://localhost:3002/api/insertbackup', {account_address: this.state.account, maincontract_address: mainaddr, backupcontract_address: newcontract})
            .then(() => {
                alert('success insert!')
            })
        }
        
    }
    sendEmail(e) {
        
        let service_id = "beautygang";
        let template_id = "backup";
        let name = "coco";
        //let userMail = e;
        emailjs.send(service_id,template_id,{
            to_name: name,
            userMail:e,
        });
        this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})     
          
    }
    checkEmail = ( email ) => {

        // checkemail
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            // this is a valid email address
            return true
        }
        else {
            // invalid email, show an error to the user.
            return false
        }
    
    }
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
                        if (this.password.value == this.checkpassword.value && this.checkEmail(this.email.value) == true){
                            this.createBackup(this.email.value,this.password.value)
                        }else if (this.checkEmail(this.email.value) != true){
                            alert('Please enter correct email!')
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