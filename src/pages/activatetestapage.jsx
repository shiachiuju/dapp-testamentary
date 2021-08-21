//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios';
import sha256 from 'js-sha256';
//includes
import '../App.css';
//contract
import Setpassword from '../contract/setpassword.json'

//components
import getWeb3 from '../getWeb3';
import Layout from '../layout';


//run activatebackup
/* 取回合約錢的畫面，還會顯示使用者錢包、合約地址(檢查用) */
class ConductTestaPage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
    }
    async loadBlockchainData() {
        //web3
        const web3 = await getWeb3();
        this.setState({  web3: web3 })
        //wallet accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    constructor(props) {
        super(props)
        this.state = {
        }
        this.activate = this.activate.bind(this);
        this.checkset = this.checkset.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    /*async checkset(setpassaddr, checkpassword) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontractforset/${setpassaddr}`)
        .then(() => {
            Axios.get(`http://localhost:3002/api/getsetcontracttttt/${acc}/${setpassaddr}`)
            .then((con) => {
                this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
            }).catch((err) => {
                console.log(setpassaddr)
            });
        }).catch((err) => {
            this.refreshPage();
        });
    }*/
    /*async checkset(setpassaddr, maincon,checkpassword) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontractforset/${setpassaddr}`)
        .then(() => {
            Axios.get(`http://localhost:3002/api/getsetcontract/${acc}/${maincon}`)
            .then((con) => {
                this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
            }).catch((err) => {
                console.log(setpassaddr)
            });
        }).catch((err) => {
            this.refreshPage();
        });
    }*/
    async checkset(setpassaddr,checkpassword) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontractforset/${setpassaddr}`)
        .then(() => {
            Axios.get(`http://localhost:3002/api/getsetcontracttttt/${acc}/${setpassaddr}`)
            .then((con) => {
                this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
            }).catch((err) => {
                console.log(setpassaddr)
            });
        }).catch((err) => {
            this.refreshPage();
        });
    }

    async activate(address,checkpassword) {
        const activatesetcontract = new this.state.web3.eth.Contract(Setpassword.abi, address)
        this.setState({ activatesetcontract });
        //console.log(address);
        this.state.activatesetcontract.methods.execute(checkpassword).send({ from: this.state.account })
        //Axios.post('http://localhost:3002/api/insertsettestament', {account_address: this.state.account, maincontract_address: addr, settestamentcontract_address: newcontract,activated:"NOT ACTIVATED YET"})
    }

    async refreshPage() { 
        window.location.reload()
    }
    render() {
        return (
        <Layout>
            <div className="App">
                <br></br>
                <h3><b>Activate Testamentary Mechanism</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                <br></br>
                <div id="activateTest">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.checkset(this.contractadd.value,this.checkpassword.value)
                    }}>
                        <Form.Group id="formCheckAddress">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Settestament contract address</b></Form.Label>
                                    <Form.Control
                                        type="text" 
                                        ref={(input) => { 
                                            this.contractadd = input
                                        }}
                                        placeholder="Enter Settestament Contract Address"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        {/*<Form.Group id="formCheckmain" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Main Address</b></Form.Label>
                                    <Form.Control 
                                        type="text"
                                        ref={(input) => { 
                                            this.maincon = input
                                        }}  
                                        placeholder="Enter Main Contract Address"
                                        required />
                                </Col>
                            </Row>
                                    </Form.Group>*/}
                        {/* <Form.Group id="formCheckEmail">
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
                        <br></br> */}
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
                                        placeholder="Password(6~8)"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        
                        &nbsp;&nbsp;&nbsp;
                        <Button type="submit" variant="outline-secondary">Activate</Button>
                    </Form>
                </div>
            </div> 
            <br></br>
        <br></br>
        <br></br>
        </Layout>
        
        ) 
    }
}
export default ConductTestaPage;