//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'

//includes
import '../App.css';
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
        //setaddress
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getsetcontractt/${acc}`)
        .then((con) => {
            this.setState({ setcontract_address: con.data[0].settestamentcontract_address.toString()})
        }).catch((err) => {
            console.log(err);
        });
    }
    constructor(props) {
        super(props)
        this.state = {
        }
        this.refreshPage = this.refreshPage.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.testaEth = this.testaEth.bind(this);
        this.Set = this.Set.bind(this);
       
    }

    async testaEth(address,checkemail,checkpassword) {
        const spContract = new this.state.web3.eth.Contract(Setpassword.abi, address)
        this.setState({ spContract });
        console.log(address);
        this.state.spContract.methods.passset(checkemail, checkpassword).send({ from: this.state.account })
    }

    async Deploy(addr,checkemail,checkpassword) {
        const contract = new this.state.web3.eth.Contract(Setpassword.abi);
        contract.deploy({
            data: Setpassword.bytecode,
            arguments: [addr]
        })
        .send({
            from: this.state.account,
            gas: 2100000,
        })
        .then((newContractInstance) => {
            console.log('successfully deployed!');
            submitNew(addr,newContractInstance.options.address.toString())
            this.testaEth(newContractInstance.options.address.toString(),checkemail,checkpassword)     
        }).catch((err) => {
            console.log(err);
        });
        const submitNew = (addr,newcontract) => {
            Axios.post('http://localhost:3002/api/insertsettestament', {account_address: this.state.account, maincontract_address: addr, settestamentcontract_address: newcontract})
            .then(() => {
                alert('success insert!')
            })
        }
    }

    async Set(contractadd,checkemail,checkpassword){
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${contractadd}`)
        .then(() => {
            Axios.get(`http://localhost:3002/api/getsetcontract/${acc}/${contractadd}`)
            .then((con) => {
                this.testaEth(con.data[0].settestamentcontract_address.toString(),checkemail,checkpassword)
            }).catch((err) => {
                this.Deploy(contractadd,checkemail,checkpassword)
            });
        }).catch((err) => {
            alert('this address not create!')
        });
    }

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
                <br></br>
                <div id="activateTest">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.Set(this.contractadd.value,this.checkemail.value,this.checkpassword.value)
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
                                        placeholder="Password(6~8)"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="outline-secondary">Set</Button>
                    </Form>
                </div>
                <br></br>
                <p><b>Settestament contract address:</b> {this.state.setcontract_address}</p>
            </div> 
        </Layout>
        ) 
    }
}
export default ActivateTestamentPage;
