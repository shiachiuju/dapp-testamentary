import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import getWeb3 from '../getWeb3'
import '../App.css';
import Layout from '../layout';


class TestaManagePage extends Component{
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
       
    }
    constructor(props) {
        super(props)
        this.state = {
            //beneficiary:[{mail:"",rate:""}],
            message:''
        }
        //this.createBackup = this.createBackup.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.addOne = this.addOne.bind(this)
        // this.sendEmail = this.sendEmail.bind(this);
    }

    async addOne(mail,rate) {
        this.state.mainContract.methods.addbene(mail,rate).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
            this.refreshPage()
    })}

    async refreshPage() { 
        window.location.reload()
    }
    addBene=(e)=>{
        this.setState((prevState)=>({
           beneficiary:[...prevState.beneficiary,{mail:"",rate:""}] 
        }))
    }
    handleSubmit=(e)=>{e.preventDefalut()}
    render() {
        return (
            <Layout>
            <div className="App">
            <br></br>
            <h1><b>Hello, user !</b></h1>
            <br></br>
            <p><b>Wallet account:</b> {this.state.account}</p>
            <p><b>Contract address:</b>*</p>
            <p><b>Contract balance:</b>*</p>
            <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.addOne(this.mail.value,this.rate.value)
                        }
                    }>
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
            </Form.Group>
            <br></br>
            <Button type="submit" variant="outline-warning">Create</Button>
            </Form>
            <br></br>
            <br></br>
            </div>
            </Layout> 
        ) 
    }
}
export default TestaManagePage;