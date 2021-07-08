//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactBootstrap, { ToggleButtonGroup, ToggleButton, Nav, Button,  Form, Col, Row,DropdownButton} from 'react-bootstrap'
//includes
import '../App.css';
import Layout from '../layout';
//import MainContract from "../contract/MainContract.json"
//contract address
import { MainContract_ABI, MainContract_ADDRESS } from '../config_maincontract.js'
//components
import getWeb3 from '../getWeb3'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

//Run maincontract
/* 執行 deposit and withdraw 的畫面，還會顯示使用者錢包、合約地址、合約餘額、備援機制設定的帳號密碼(檢查用)  */ 
class MainPage extends Component {
    componentDidMount() {
        //window.location.reload(); 
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

        /*
        error
        const deployedNetwork = MainContract.networks[netId];
        const contract_address = MainContract.networks[netId].address;
        */

        //main contract
        const mainContract = new web3.eth.Contract(MainContract_ABI, MainContract_ADDRESS)
        //const mainContract = new web3.eth.Contract(MainContract.abi, MainContract.networks[netId].address)
        this.setState({ mainContract })
        const contract_address = MainContract_ADDRESS;
        //const contract_address = mainContract.networks[netId].address;
        this.setState({ contract_address })

        //view contract data
        const balance = await mainContract.methods.getBalance().call()
        this.setState({ balance })
        const owners = await mainContract.methods.getOwners().call()
        this.setState({ owners })
        const email = await mainContract.methods.getEmail().call()
        this.setState({ email })
        const password = await mainContract.methods.getPassword().call()
        this.setState({ password })

        if (this.state.email != '' ){
            this.setState({ backup : 'The backup mechanism has been set.'})
        }
    }
    constructor(props) {
        super(props)
        this.state = {
        account: '',
        contract_address:'',
        balance: 0,
        email: '',
        password: '',
        backup : 'The backup mechanism has NOT been set.'
        }
        this.Deposit = this.Deposit.bind(this);
        this.Withdraw = this.Withdraw.bind(this);
        
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
    render() {
        return (
        <Layout>
        <div className="App">
            <br></br>
            <h1><b>Hello, user !</b></h1>
            <br></br>
            <p><b>Wallet account:</b> {this.state.account}</p>
            <p><b>{this.state.backup}</b></p>
            {/* <p><b>Contract address:</b> {this.state.contract_address}</p>
            <p><b>*Contract email:</b> {this.state.email}</p>
            <p><b>*Contract password:</b> {this.state.password}</p> */}
            <br></br>
            <div id="ether">
                <div>
                <Form>
                    <Form.Group id="ether">
                        <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                        <Form.Label><b>Deposit or Withdraw Ether</b></Form.Label></Col>
                        <Col md={{ span: 2, offset: 5 }}>
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
                    <br></br>
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
            </div>
            <br></br>
            <div>
				<Button variant="outline-dark" size="lg" href="/Backup" block>
                    back-up mechanism
                </Button>
                {" "}
				<Button variant="outline-dark" size="lg" href="/TestaManage" block>
                    testamentary management
                </Button>
			</div>  
        </div>
        </Layout>
        );
    }
}

export default MainPage;
