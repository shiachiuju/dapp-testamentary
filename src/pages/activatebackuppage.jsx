//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import sha256 from 'js-sha256';
import Axios from 'axios'
import Swal from 'sweetalert2'
//includes
import '../App.css';
import Layout from '../layout';
//contract
import ActivateBackup from '../contract/ActivateBackup.json'
//components
import getWeb3 from '../getWeb3';

//run activatebackup
/* 取回合約錢的畫面，還會顯示使用者錢包、合約地址(檢查用) */
class ActivateBackupPage extends Component {
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
            message: '',
            message2: ''
        }
        this.BackEth = this.BackEth.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.Activate = this.Activate.bind(this);
        this.Delete = this.Delete.bind(this);
    }
    async BackEth(backaddr,address,checkemail,checkpassword) {
        const acBackupContract = new this.state.web3.eth.Contract(ActivateBackup.abi, address)
        this.setState({ acBackupContract });
        console.log(address);
        this.state.acBackupContract.methods.activateBackup(checkemail,checkpassword)
        .send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ message2: 'Your assets from previous wallet has transferred to\n' + this.state.account + '\nnew balance :'})
            this.Delete(backaddr);
        }).once('error', (error) => {
            // alert('請輸入正確地址');
    })}
    
    async Delete(backaddr) {
        Axios.get(`http://localhost:3002/api/getmaincontract/${backaddr}`)
        .then((con) => {
            const deletemain = con.data[0].maincontract_address.toString();
            console.log(deletemain);
            Axios.delete(`http://localhost:3002/api/deletemain/${deletemain}`).then((response)=>{
                alert("deleted!")
            })
            Axios.delete(`http://localhost:3002/api/deleteback/${backaddr}`).then((response)=>{
                alert("deleted!")
            })
            Axios.delete(`http://localhost:3002/api/deleteactivateback/${backaddr}`).then((response)=>{
                alert("deleted!")
            })
        }).catch((err) => {
                
        });
    }
    async Deploy(backaddr,checkemail,checkpassword) {
        const contract = new this.state.web3.eth.Contract(ActivateBackup.abi);
        contract.deploy({
            data: ActivateBackup.bytecode,
            arguments: [backaddr]
        })
        .send({
            from: this.state.account,
            gas: 2100000,
        })
        .then((newContractInstance) => {
            console.log('successfully deployed!');
            submitNew(backaddr,newContractInstance.options.address.toString())
            this.BackEth(backaddr,newContractInstance.options.address.toString(),checkemail,checkpassword)     
        }).catch((err) => {
            console.log(err);
        });
        const submitNew = (backaddr,newcontract) => {
            Axios.post('http://localhost:3002/api/insertactivatebackup', {account_address: this.state.account, backupcontract_address: backaddr, activatebackup_address: newcontract})
            .then(() => {
                alert('success insert!')
            })
        }
        
    }
    async Activate(contractadd,checkemail,checkpassword){
        this.checkhash = sha256(checkpassword.toString())
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getbackupcontract/${contractadd}`)
        .then((con) => {
            if(con.data.length == 0){
                new Swal({
                    title: 'Please enter the right address.',
                    width: 600,
                    padding: '3em',
                    background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://c.tenor.com/1Qah7X4zx3oAAAAi/neon-cat-rainbow.gif")
                        left top
                        no-repeat
                    `
                }).then(function() {
                });
            }else{
                Axios.get(`http://localhost:3002/api/getactivatebackupcontract/${acc}/${contractadd}`)
                .then((con) => {
                    this.BackEth(contractadd,con.data[0].activatebackup_address.toString(),checkemail,this.checkhash)
                }).catch((err) => {
                    this.Deploy(contractadd,checkemail,this.checkhash)
                });
                }
        }).catch((err) => {
            
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
                <h3><b>Activate Back-up Mechanism</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                {/* <p><b>*Contract address:</b> {this.state.contract_address}</p> */}
                <p></p>
                <div id="activateBack">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({ message : 'Once you send the request, we will confirm your identity.\nPlease wait a moment and soon your assets will be back!'})
                        this.Activate(this.contractadd.value,this.checkemail.value,this.checkpassword.value)
                    }}>
                        <Form.Group id="formCheckAddress">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Back-up contract address</b></Form.Label>
                                    <Form.Control
                                        type="text" 
                                        ref={(input) => { 
                                            this.contractadd = input
                                        }}
                                        placeholder="check mailbox to get back-up address"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <p></p>
                        <Form.Group id="formCheckEmail">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Email address</b></Form.Label>
                                    <Form.Control
                                        type="email" 
                                        ref={(input) => { 
                                            this.checkemail = input
                                        }}
                                        placeholder="example@email.com"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <p></p>
                        <Form.Group id="formCheckPassword" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control 
                                        type="password"
                                        ref={(input) => { 
                                            this.checkpassword = input
                                        }}  
                                        placeholder="must have at least 6 characters"
                                        minlength="6"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="outline-secondary">Activate</Button>
                    </Form>
                    <p></p>
                    <p>{this.state.message}</p>
                    <p>{this.state.message2}</p>
                </div>
            </div>
            </Layout> 
        ) 
    }
}
export default ActivateBackupPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/