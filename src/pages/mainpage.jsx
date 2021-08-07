//dependencies
import React, { Component } from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
import { Button,  Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
//includes
import '../App.css';
import Layout from '../layout';
//contractabi
import MainContract from '../contract/MainContract.json'
//components
import getWeb3 from '../getWeb3'


=======
=======
>>>>>>> parent of 4a7be88 (no message)
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactBootstrap, { Navbar, Container, Nav, Button,  Form, Col, Row} from 'react-bootstrap'
//includes
import '../App.css';
//contract address
import { MainContract_ABI, MainContract_ADDRESS } from '../config_maincontract.js'
//components
import getWeb3 from '../getWeb3'
<<<<<<< HEAD
>>>>>>> parent of 4a7be88 (no message)
=======
>>>>>>> parent of 4a7be88 (no message)

//Run maincontract
/* 執行 deposit and withdraw 的畫面，還會顯示使用者錢包、合約地址、合約餘額、備援機制設定的帳號密碼(檢查用)  */ 
class MainPage extends Component {
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
<<<<<<< HEAD
        //contract address
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        .then((con) => {
            const mainContract = new web3.eth.Contract(MainContract.abi, con.data[0].maincontract_address.toString())
            this.setState({ mainContract});
            this.getinfo();
            console.log(con.data[0].maincontract_address);
        }).catch((err) => {
            this.Deploy()
        });
    }
    async getinfo(){
        const balance = await this.state.mainContract.methods.getBalance().call()
=======

        /*
        error
        const deployedNetwork = MainContract.networks[netId];
        const contract_address = MainContract.networks[netId].address;
        */

        //main contract
        const mainContract = new web3.eth.Contract(MainContract_ABI, MainContract_ADDRESS)
        this.setState({ mainContract })
        const contract_address = MainContract_ADDRESS;
        this.setState({ contract_address })

        //view contract data
        const balance = await mainContract.methods.getBalance().call()
>>>>>>> parent of 4a7be88 (no message)
        this.setState({ balance })
        const owners = await this.state.mainContract.methods.getOwners().call()
        this.setState({ owners })
        const email = await this.state.mainContract.methods.getEmail().call()
        this.setState({ email })
        const password = await this.state.mainContract.methods.getPassword().call()
        this.setState({ password })
        const beneficiarymail = await this.state.mainContract.methods.returnlen().call()
        this.setState({ beneficiarymail })
        if (this.state.email != '' ){
            this.setState({ backup : 'The backup mechanism has been set.'})
        }
        if (this.state.beneficiarymail != 0 ){
            this.setState({ beneficiary : 'The testament mechanism has been set.'})
        }

    }
    constructor(props) {
        super(props)
        this.state = {
        account: '',
        contract_address: '',
        balance: 0,
        email: '',
        password: '',
        backup : 'The backup mechanism has NOT been set.',
        beneficiary : 'The testament mechanism has NOT been set.'
        }
        this.Deposit = this.Deposit.bind(this);
        this.Withdraw = this.Withdraw.bind(this);
        this.Deploy = this.Deploy.bind(this);
        // this.FetchContract = this.FetchContract.bind(this);
        
    }
    async Deposit(Amount) {
        this.state.mainContract.methods.deposit().send({ value: Amount.toString(), from: this.state.account })
        .once('receipt', (receipt) => {
            this.refreshPage()
    })}
    async Withdraw(Amount) {
        this.state.mainContract.methods.withdraw(Amount).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            // alert(receipt)
            this.refreshPage()
        })
        .once('error', (error) => {
            // alert(error)
        })
    }
    async refreshPage() { 
        window.location.reload()
    }
<<<<<<< HEAD
<<<<<<< HEAD
    // async FetchContract() {
    //     const acc = this.state.account
    //     Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
    //     .then((con) => {
    //         const mainContract = new this.state.web3.eth.Contract(MainContract.abi, con)
    //         this.setState({ mainContract });
    //         console.log(con.data[0].maincontract_address);
    //     }).catch((err) => {
    //         this.Deploy()
    //     });
    // }
    
    async Deploy() {
        const contract = new this.state.web3.eth.Contract(MainContract.abi);
        contract.deploy({
            data: MainContract.bytecode
            // arguments: [123, 'My String']
        })
        .send({
            from: this.state.account,
            gas: 2100000,
        })
        .then((newContractInstance) => {
            console.log('successfully deployed!');
            console.log(newContractInstance.options.address);
            submitNew(newContractInstance.options.address)
            this.refreshPage()
        }).catch((err) => {
            console.log(err);
        });
        const submitNew = (newcontract) => {
            Axios.post('http://localhost:3002/api/insert', {account_address: this.state.account, maincontract_address: newcontract})
            .then(() => {
                alert('success insert!')
            })
        }
    }
    render() {
        return (
        <Layout>
=======
    render() {
        return (
=======
    render() {
        return (
>>>>>>> parent of 4a7be88 (no message)
        <div id="navbar">
            <Navbar bg="light" variant="light">
                <Container>
                <Nav className="mr-auto">
                <Nav.Link href="/">Main</Nav.Link>
                <Nav.Link href="/Backup">Create</Nav.Link>
                <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    Signed in as: <a href="https://beautygang.fr/">Beauty</a>
                    </Navbar.Text>
                </Navbar.Collapse>
                </Container>
            </Navbar>
<<<<<<< HEAD
>>>>>>> parent of 4a7be88 (no message)
=======
>>>>>>> parent of 4a7be88 (no message)
        <div className="App">
            <br></br>
            <h1><b>Hello, user !</b></h1>
            <br></br>
            <p><b>Wallet account:</b> {this.state.account}</p>
            {/* <p><b>{this.state.backup}</b></p> */}
            {/* <p><b>Contract address:</b> {this.state.contract_address}</p>
            <p><b>*Contract email:</b> {this.state.email}</p>
            <p><b>*Contract password:</b> {this.state.password}</p> */}
            <br></br>
            <div id="ether">
                <div>
                <Form>
                    <Form.Group id="ether">
                        <Row>
<<<<<<< HEAD
<<<<<<< HEAD
                        <Col md={{ span: 4, offset: 4 }}>
                        <Form.Label><b>Deposit or Withdraw Ether</b></Form.Label></Col>
                        <Col md={{ span: 2, offset: 5 }}>
=======
=======
>>>>>>> parent of 4a7be88 (no message)
                            <Form.Label><b>Deposit or Withdraw Ether</b></Form.Label>
                            <Col md={{ span: 2, offset: 5 }}>
>>>>>>> parent of 4a7be88 (no message)
                                <Form.Control
                                    id="Amount"
                                    ref={(input) => { 
                                        this.amount = input
                                    }} 
                                    type="number"  
                                    placeholder="ETH" 
                                    required/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <p></p>
                    <Button variant="warning" onClick={(event) => {
                        event.preventDefault()
                        this.Deposit(this.amount.value * 10**18)
                    }}>Deposit</Button>{' '}
                    <Button  variant="secondary" onClick={(event) => {
                        event.preventDefault()
                        this.Withdraw(this.amount.value)
                    }}>Withdraw</Button>
                </Form>
                </div>
                <p></p>
                <p><b>Balance:</b> {this.state.balance / 10**18} (ether)</p>
                {/* <Button size="sm" variant="outline-warning" onClick={(event) => {
                        event.preventDefault()
                        this.Deploy()
                }}>Deploy</Button> 
                <Button size="sm" variant="outline-warning" onClick={(event) => {
                        event.preventDefault()
                        this.FetchContract()
                }}>fetch</Button>  */}
            </div>
            <br></br>
            <div id="outer">
                <div class="inner"><form method="get" action="/Backup">
                    <button class="mainpagebutton" type="submit">Back-up</button>
                </form></div>{" "}
                <div class="inner"><form method="get" action="/TestaManage">
                    <button class="mainpagebutton" type="submit">Testament</button>
                </form></div>
			</div>
             
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        </Layout>
=======
        </div>
>>>>>>> parent of 4a7be88 (no message)
=======
        </div>
>>>>>>> parent of 4a7be88 (no message)
        );
    }
}

export default MainPage;

/*<Nav.Link href="/">Main</Nav.Link>
                <Nav.Link href="/Backup">Create</Nav.Link>
                <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
                <Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/
