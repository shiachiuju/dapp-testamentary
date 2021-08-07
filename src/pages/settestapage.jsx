//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'

//includes
import '../App.css';
//contract
import { setpassword_ABI, setpassword_ADDRESS } from '../config_setpassword.js'
//contractabi
import Setpassword from '../contract/setpassword.json'
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
        this.setState({ web3: web3 })
        //wallet accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }
    constructor(props) {
        super(props)
        this.state = {
        }
        this.refreshPage = this.refreshPage.bind(this);
        this.CheckContract = this.CheckContract.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.createSetpass = this.createSetpass.bind(this);
    }

    async CheckContract(contractadd, checkemail, checkpassword) {
        // checkpassword 只是名字
        const spContract = new this.state.web3.eth.Contract(Setpassword.abi, contractadd)
        this.setState({ spContract });
        this.state.spContract.methods.checkContract(contractadd, checkemail, checkpassword).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.refreshPage()
        }).once('error', (error) => {
            // alert('請輸入正確地址');
    })}

    async Deploy(mainaddr,email,password) {
        const spContract = new this.state.web3.eth.Contract(Setpassword.abi)
        spContract.deploy({
            data: Setpassword.bytecode,
            arguments: [mainaddr]
        })
        .send({
            from: this.state.account,
            gas: 2100000,
        })
        .then((newContractInstance) => {
            console.log('successfully deployed!');
            submitNew(newContractInstance.options.address.toString())
            this.refreshPage()
        }).catch((err) => {
            console.log(err);
        });
        const submitNew = (newcontract) => {
            Axios.post('http://localhost:3002/api/insertsettestament', {account_address: this.state.account, maincontract_adress: mainaddr, settestamentcontract_address: newcontract})
            .then(() => {
                alert('success insert!')
            })
        }
    }

    async createSetpass(addr, email, password) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getsetpasscontract/${acc}`)
             .then((con) => {
                this.CheckContract(con.data[0].settestamentcontract_address.toString(), email, password);
           }).catch((err) => {
                Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
                    .then((con) => {
                        this.Deploy(con.data[0].maincontract_address.toString(),email,password)
                    }).catch((err) => {
                        });
            }); 
        }
    
    // async Enterinfo(address,email,password) {
    //     const spContract = new this.state.web3.eth.Contract(Setpassword.abi, address)
    //     this.setState({ spContract });
    //     const getemail = await this.state.spContract.methods.getEmail().call()
    //     this.setState({ getemail })
    //     if (this.state.getemail != '' ){
    //         alert('Your backup mechanism has been set. \nClick confirm to change a new one!')
    //     }
    //     this.state.backupContract.methods.setBackup(email,password).send({ from: this.state.account })
    //     .once('receipt', (receipt) => {
    //         this.sendEmail(email)
    //         // this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
    //         // this.refreshPage()
    // })}
            
    async refreshPage() { 
        window.location.reload()
    }

    render() {
        return (
        <Layout>
            <div className="App">
                <br></br>
                <h3><b>Set Activated Information</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                {/* <p><b>*Contract address:</b> {this.state.contract_address}</p> */}
                <br></br>
                <div id="activateTest">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.createSetpass(this.checkemail.value, this.checkpassword.value)
                        //this.CheckContract(this.contractadd.value, this.checkemail.value, this.checkpassword)
                    }}>
                        <Form.Group id="formCheckAddress">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Testamentary contract address</b></Form.Label>
                                    <Form.Control
                                        type="text" 
                                        ref={(input) => { 
                                            this.contractadd = input
                                        }}
                                        placeholder="Enter testamentary address"
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
                                        minLength="6" 
                                        maxLength="8"
                                        ref={(input) => { 
                                            this.checkpassword = input
                                        }}  
                                        placeholder="Password"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="outline-secondary">Set</Button>
                    </Form>
                </div>
            </div> 
        </Layout>
        ) 
    }
}
export default ActivateTestamentPage;
