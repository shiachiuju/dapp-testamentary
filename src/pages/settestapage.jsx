//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
import $ from 'jquery';
import Swal from 'sweetalert2'

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
            for(var i=0; i< con.data.length; i++){
                this.setState({
                    setcontract_address: [this.state.setcontract_address, (i+1).toString()+" : "+con.data[i].settestamentcontract_address.toString() + "\n"]
                })
            }
        }).catch((err) => {
            console.log(err);
        });
        //maincontract
        Axios.get(`http://localhost:3002/api/getcontractforset/${acc}`)
        .then((con) => {
            for(var i=0; i< con.data.length; i++){
                this.setState({
                    maincontract_address: [this.state.maincontract_address, (i+1).toString()+" : "+con.data[i].maincontract_address.toString() + "\n"]
                })
            }
        }).catch((err) => {
            console.log(err);
        });
        //status
        Axios.get(`http://localhost:3002/api/getsetstatus/${acc}`)
        .then((con) => {
            for(var i=0; i< con.data.length; i++){
                this.setState({
                    activated: [this.state.activated, (i+1).toString()+" : "+con.data[i].activated.toString() + "\n"]
                })
            }
        }).catch((err) => {
            console.log(err);
        });
        
    }
    constructor(props) {
        super(props)
        this.state = {
            item : [],
            setcontract_address : [],
            maincontract_address : [],
            activated: [],
        }
        this.refreshPage = this.refreshPage.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.testaEth = this.testaEth.bind(this);
        this.Set = this.Set.bind(this);
        this.activate = this.activate.bind(this);
        this.checkset = this.checkset.bind(this);
       
    }

    async testaEth(address,checkemail,checkpassword) {
        const spContract = new this.state.web3.eth.Contract(Setpassword.abi, address)
        this.setState({ spContract });
        console.log(address);
        this.state.spContract.methods.passset(checkemail, checkpassword).send({ from: this.state.account })
        //this.refreshPage()
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
            Axios.post('http://localhost:3002/api/insertsettestament', {account_address: this.state.account, maincontract_address: addr, settestamentcontract_address: newcontract, activated:"Not Activated Yet"})
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

    //Activate
    async checkset(setpassaddr,checkpassword) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getsetcontracttttt/${acc}/${setpassaddr}`)
        .then((con) => {
            this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
        }).catch((err) => {
            console.log('err')
        });
        
    }


    async activate(address,checkpassword) {
        const acc = this.state.account
        const act = "Activated"
        const activatesetcontract = new this.state.web3.eth.Contract(Setpassword.abi, address)
        this.setState({ activatesetcontract });
        //console.log(address);
        this.state.activatesetcontract.methods.execute(checkpassword).send({ from: this.state.account })
        .then((con) => {
            Axios.put(`http://localhost:3002/api/changestatus/${act}/${acc}/${address}`)
            console.log('ha')
            this.refreshPage()
        }).catch((err) => {
            console.log('error activate')
        });
    }

   

    render() {
        return (
        <Layout>
            <div className="App">
                <br></br>
                <h3><b>Set Activated Information</b></h3>
                <br></br>
                <p><b>Wallet account:</b> {this.state.account}</p>
                <div class="form-group" id="activateTest">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.Set(this.contractadd.value,this.checkemail.value,this.checkpassword.value)
                    }}>
                        <Form.Group id="formCheckAddress">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label class="col-form-label"><b>Testamentary contract address</b></Form.Label>
                                    <Form.Control
                                        type="text" 
                                        ref={(input) => { 
                                            this.contractadd = input
                                        }}
                                        placeholder="Paste Testamant Address Here"
                                        required />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group id="formCheckEmail">
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label class=" col-form-label"><b>Email address</b></Form.Label>
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
                                
                        <Form.Group id="formCheckPassword" >
                            <Row>
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Form.Label class=" col-form-label"><b>Password</b></Form.Label>
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
                        <Button  type="submit" class="btn-primary btn-lg" variant="outline-secondary">Set My Password</Button>
                    </Form>
                    <br></br>
                </div>
                <div class="table-responsive">
                <table class="table table-hover table-sm">
                    <thead>
                     <tr>
                        <th scope="col">Testament Address</th>
                        <th scope="col">Set Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Activate</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       
                       <td>
                            {this.state.maincontract_address.map(item => (
                            <p key={item}>{item}</p>
                            ))}
                       </td>
                       <td>
                           {this.state.setcontract_address.map(item => (
                            <p key={item}>{item}</p>
                            ))}
                       </td>
                       <td>
                            {this.state.activated.map(item => (
                            <p key={item}>{item}</p>
                            ))}
                       </td>
                    <td>  
                    <div id="setback">       
                    <Form onSubmit={ async (event) => {
                        event.preventDefault()
                        this.checkset(this.contractadd.value, this.checkpassword.value)
                        if ( this.state.account === "" ){
                            this.refreshPage()
                        }
                    
                        const { value: formValues } = await Swal.fire({
                            title: 'Enter the address and password',
                            width: 600,
                            confirmButtonColor: '#eea13c',
                            confirmButtonText: 'OK!',
                            html:
                                '<form role="form">'+
                                    '<div class="form-group row">'+
                                        '<label for="contract" class="col-sm-4" style="margin-top:.5em;text-align:left;">Settestament contract address :</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="contract" class="form-control" placeholder="Paste Your Set Address Here" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row">'+
                                        '<label for="password" class="col-sm-4" style="margin-top:.5em;text-align:left;">Password :</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="password" type="password" class="form-control" placeholder="password(6~8)" required/>'+
                                        '</div>'+
                                    '</div>'+
                                '</form>',
                            focusConfirm: false,
                        })
                            if (formValues) {
                                this.checkset($('#contract').val(),$('#password').val())
                            }
                    }}>
                        <Button type="submit" variant="outline-secondary">Activate</Button>
                    </Form>
                        </div>
                        </td>
                    </tr>
                </tbody>
                    </table>
                <br></br>
                </div>
            </div> 
        </Layout>
        ) 
    }
}
export default ActivateTestamentPage;
