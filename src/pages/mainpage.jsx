//dependencies
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
//includes
import '../App.css';
import Layout from '../layout';
import Swal from 'sweetalert2'
//contractabi
import MainContract from '../contract/MainContract.json'
//components
import getWeb3 from '../getWeb3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)



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
        const walletb = await web3.eth.getBalance(this.state.account)
        const maximum = walletb*0.99
        this.setState({ maximum: maximum })
        //contract address
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        .then((con) => {
            const mainContract = new web3.eth.Contract(MainContract.abi, con.data[0].maincontract_address.toString())
            this.setState({ mainContract});
            this.getinfo();
            console.log(con.data[0].maincontract_address);
        }).catch((err) => {
            new Swal({
                title: 'Do you want to create your own account?',
                // text: `The minimum amount should more than 0 ether`,
                showCancelButton: true,
                confirmButtonColor: '#eea13c',
                cancelButtonColor: '#8C8F8D',
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                width: 600,
                padding: '3em',
                background: '#fff',
                backdrop: `
                    shadow: '0px 0px 5px #888888'
                    left top
                    no-repeat
                `
            }).then((result) => {
                if (result.isConfirmed) {
                    this.Deploy()
                }else if(result.dismiss === Swal.DismissReason.cancel){
                    window.location = "/"
                }
            });
            // this.Deploy()
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
        const beneficiarymail = await this.state.mainContract.methods.returnlen().call()
        this.setState({ beneficiarymail })
        // if (this.state.email != '' ){
        //     this.setState({ backup : 'The backup mechanism has been set.'})
        // }
        // if (this.state.beneficiarymail != 0 ){
        //     this.setState({ beneficiary : 'The testament mechanism has been set.'})
        // }

    }
    constructor(props) {
        super(props)
        this.state = {
        account: '',
        contract_address: '',
        balance: 0,
        email: '',
        password: '',
        // backup : 'The backup mechanism has NOT been set.',
        // beneficiary : 'The testament mechanism has NOT been set.'
        }
        this.Deposit = this.Deposit.bind(this);
        this.Withdraw = this.Withdraw.bind(this);
        this.Deploy = this.Deploy.bind(this);
        // this.FetchContract = this.FetchContract.bind(this);
        
    }
    async Deposit(Amount) {
        this.state.mainContract.methods.deposit().send({ value: Amount, from: this.state.account })
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
            new Swal({
                title: 'Please enter the submit on MetaMask',
                confirmButtonColor: '#eea13c',
                // cancelButtonColor: '#8C8F8D',
                confirmButtonText: 'OK',
                // cancelButtonText: 'Cancel',
                width: 600,
                padding: '3em',
                background: '#fff',
                backdrop: `
                    shadow: '0px 0px 5px #888888'
                    left top
                    no-repeat
                `
            }).then(() => {
                window.location.reload()
        })});
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
        <div class="App">
            
            <h2><b>Hello, </b></h2>
            <h5>{this.state.account}</h5>
            
            {/* <p><b>Wallet account:</b> {this.state.account}</p> */}
            {/* <p><b>{this.state.backup}</b></p> */}
            {/* <p><b>Contract address:</b> {this.state.contract_address}</p>
            <p><b>*Contract email:</b> {this.state.email}</p>
            <p><b>*Contract password:</b> {this.state.password}</p> */}
            
            <div id="ether">
                <div>
                <form>
                    {/* <Form.Group id="ether">
                        <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                        <Form.Label class="dwlabel"><b>Deposit or Withdraw Ether</b></Form.Label></Col>
                        <Col md={{ span: 2, offset: 5 }}>
                                <Form.Control
                                    id="Amount"
                                    type="number"
                                    min="0"
                                    ref={(input) => { 
                                        this.amount = input
                                    }} 
                                    // type="number"  
                                    placeholder="ETH" 
                                    required/>
                            </Col>
                        </Row>
                    </Form.Group> */}
                    <div>
                        <Col>
                            <label for="amount" class="dwlabel"><b>Deposit or Withdraw Ether</b></label>
                        </Col>
                        <Row>
                            <Col sm={3}>
                                <FontAwesomeIcon color="#8C8F8D" icon={["fas", "angle-left"]}  size="3x" type="submit" onClick={(event)=>{event.preventDefault();window.location="/Backup"}}/>
                                <p>Backup</p>
                            </Col>
                            <Col lg={6}><input 
                                class="dwinput"
                                type="number" 
                                id="amount" 
                                name="amount" 
                                ref={(input) => { 
                                    this.amount = input
                                }}
                                placeholder="ETH" 
                                required
                            ></input></Col>
                            <Col sm={3}>
                                <FontAwesomeIcon color="#8C8F8D" icon={["fas", "angle-right"]} size="3x" type="submit" onClick={(event)=>{event.preventDefault();window.location="/TestaManage"}}/>
                                <p>Testament</p>
                            </Col>
                        </Row>
                        {/* <Col>
                        <button>left</button>
                            <input 
                                class="dwinput"
                                type="number" 
                                id="amount" 
                                name="amount" 
                                ref={(input) => { 
                                    this.amount = input
                                }}
                                placeholder="ETH" 
                                required
                            ></input>
                        </Col> */}
                    </div>
                    <p></p>
                    <button class="dw" onClick={(event) => {
                        event.preventDefault()
                        // console.log(this.amount.value)
                        // console.log(this.state.maximum)
                        if ((this.amount.value*10**18) > this.state.maximum){
                            new Swal({
                                title: 'Not enough ether',
                                text: `The maximum amount is ${(Math.round((this.state.maximum/10**18)*100)/100)} ether`,
                                confirmButtonColor: '#eea13c',
                                confirmButtonText: 'OK',
                                width: 600,
                                padding: '3em',
                                background: '#fff',
                                backdrop: `
                                    shadow: '0px 0px 5px #888888'
                                    left top
                                    no-repeat
                                `
                            }).then(function() {
                                // window.location.reload()
                            });
                        }else if(this.amount.value <= 0){
                            new Swal({
                                title: 'Please enter the amount',
                                text: `The minimum amount should be more than 0 ether`,
                                confirmButtonColor: '#eea13c',
                                confirmButtonText: 'OK',
                                width: 600,
                                padding: '3em',
                                background: '#fff',
                                backdrop: `
                                    shadow: '0px 0px 5px #888888'
                                    left top
                                    no-repeat
                                `
                            }).then(function() {
                                // window.location.reload()
                            });
                        }else{
                            this.Deposit((this.amount.value * (10**18)).toString()) 
                        }
                    }}>Deposit</button>{' '}
                    <button class="dw" onClick={(event) => {
                        // console.log(this.amount.value)
                        // console.log(this.state.balance)
                        event.preventDefault()
                        if ((this.amount.value*10**18) > this.state.balance){
                            new Swal({
                                title: 'Not enough ether',
                                text: `The balance is ${this.state.balance / 10**18} ether`,
                                confirmButtonColor: '#eea13c',
                                confirmButtonText: 'OK',
                                width: 600,
                                padding: '3em',
                                background: '#fff',
                                backdrop: `
                                    shadow: '0px 0px 5px #888888'
                                    left top
                                    no-repeat
                                `
                            }).then(function() {
                                // window.location.reload()
                            });
                        }else if(this.amount.value <= 0){
                            new Swal({
                                title: 'Please enter the amount',
                                text: `The minimum amount should more than 0 ether`,
                                confirmButtonColor: '#eea13c',
                                confirmButtonText: 'OK',
                                width: 600,
                                padding: '3em',
                                background: '#fff',
                                backdrop: `
                                    shadow: '0px 0px 5px #888888'
                                    left top
                                    no-repeat
                                `
                            }).then(function() {
                                // window.location.reload()
                            });
                        }else{
                            this.Withdraw((this.amount.value* (10**18)).toString())
                        }
                    }}>Withdraw</button>
                </form>
                </div>
                <p></p>
                <p class="dwlabel"><b>Balance:</b> {this.state.balance / 10**18} (ether)</p>
            </div>
            <br></br>
            {/* <div id="outer">
                <div class="inner"><form method="get" action="/Backup">
                    <button class="mainpagebutton" type="submit">Back-up</button>
                </form></div>{" "}
                <div class="inner"><form method="get" action="/TestaManage">
                    <button class="mainpagebutton" type="submit">Testament</button>
                </form></div>
			</div> */}
             
        </div>
        </Layout>
        );
    }
}

export default MainPage;

/*<Nav.Link href="/">Main</Nav.Link>
                <Nav.Link href="/Backup">Create</Nav.Link>
                <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
                <Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/
