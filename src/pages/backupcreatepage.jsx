//dependencies
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
import sha256 from 'js-sha256';
import $ from 'jquery';
import Swal from 'sweetalert2'
//includes
import '../App.css';
import Layout from '../layout';
//contractabi
import Backup from '../contract/Backup.json'
//components
import getWeb3 from '../getWeb3';
import emailjs, { init } from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
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
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getbackupcontract/${acc}`)
        .then((con) => {
            console.log(con.data)
            if(con.data.length == 0){
                this.setState({ set: 'Backup mechanism has not been set' });
            }else{
                const backupContract = new this.state.web3.eth.Contract(Backup.abi, con.data[0].backupcontract_address.toString())
                this.setState({ backupContract });
                getemail()
            }
        }).catch((err) => {
            
        });
        const getemail = () => {
            const email = this.state.backupContract.methods.getEmail().call()
            this.setState({ email })
            if (this.state.email != '' ){
                this.setState({ set: 'Backup mechanism has been set' })
                console.log(this.state.email)
            }
        }

    }
    constructor(props) {
        super(props)
        this.state = {
            account:'',
            set: '',
            // message: ''
        }
        this.createBackup = this.createBackup.bind(this);
        this.Deploy = this.Deploy.bind(this);
        this.Enterinfo = this.Enterinfo.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }
    async createBackup(email, password) {
        this.hash = sha256(password.toString())
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getbackupcontract/${acc}`)
        .then((con) => {
            this.Enterinfo(con.data[0].backupcontract_address.toString(), email, this.hash);
        }).catch((err) => {
            Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
            .then((con) => {
                this.Deploy(con.data[0].maincontract_address.toString(), email, this.hash)
            }).catch((err) => {
                new Swal({
                    title: 'Please create your account first',
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
                    window.location = "/Main"
                });
            });
        });
    }
    async Enterinfo(address, email, password) {
        const backupContract = new this.state.web3.eth.Contract(Backup.abi, address)
        this.setState({ backupContract });
        const getemail = await this.state.backupContract.methods.getEmail().call()
        this.setState({ getemail })
        const setBack = () =>{
            this.state.backupContract.methods.setBackup(email,password).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.sendEmail(email,address)
                // this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
                // this.refreshPage()
            })
            .once('error', (error) => {
                new Swal({
                    title: 'Transaction has dismissed',
                    text: 'Setting remain the same',
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
                    window.location.reload()
                });
            })
        }
        if (this.state.getemail != '' ){
            new Swal({
                title: 'Are you sure to change the email and password?',
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
                    setBack()
                }else if(result.dismiss === Swal.DismissReason.cancel){
                    window.location.reload()
                }
                
            });
            // alert('Your backup mechanism has been set. \nClick confirm to change a new one!')
            // this.setState({ backup : 'The backup mechanism has been set.'})
        }else{
            setBack()
        }
        }

    async refreshPage() {
        window.location.reload()
    }
    async Deploy(mainaddr, email, password) {
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
            submitNew(mainaddr, newContractInstance.options.address.toString())
            this.Enterinfo(newContractInstance.options.address.toString(), email, password);
        }).catch((err) => {
            new Swal({
                title: 'Transaction has dismissed',
                text: 'Please enter the submit on Metamask',
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
                // this.refreshPage()
            });
        });
        const submitNew = (mainaddr, newcontract) => {
            Axios.post('http://localhost:3002/api/insertbackup', { account_address: this.state.account, maincontract_address: mainaddr, backupcontract_address: newcontract })
                .then(() => {
                    alert('success insert!')
                })
        }

    }


    sendEmail(e,address) {
        let service_id = "beautygang";
        let template_id = "backup";
        let name = this.state.account;
        let backadd = address;
        emailjs.send(service_id,template_id,{
            to_name: name,
            userMail: e,
            message: "We are here to notify that your back-up mechanism has been created. Your backup contract address is " + backadd + ". \n\r Don't forget your email and password so that you can activated it when needed.",
        })
        .then(
            new Swal({
                title: 'We have sent an e-mail to your mailbox,' + '\n' + 'please check it out!',
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
                window.location.reload()
            })
        )
        .catch((err) => {
            console.log(err)
        });
        // this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!'})     
    }

    render() {
        return (
            <Layout>
            <button class="prev" onClick={(event)=>{event.preventDefault();window.location="/Main"}}><FontAwesomeIcon color="white" icon={["fas", "angle-left"]} type="submit" /> Prev</button>
            <div class="App">
                
                <br></br>
                <h3><b>Create Back-up Mechanism</b></h3>
                <br></br>
                {/* <p><b>Wallet account:</b> {this.state.account}</p> */}
                <p><b>{this.state.set}</b></p>
                <p>Click the button to set your back-up mechanism!</p>
                <br></br>
                <div id="setback">
                    <Form onSubmit={ async (event) => {
                        event.preventDefault()
                        if ( this.state.account == "" ){
                            this.refreshPage()
                        }
                        // if (this.password.value == this.checkpassword.value && this.checkEmail(this.email.value) == true){
                        //     this.createBackup(this.email.value,this.password.value)
                        // }else if (this.checkEmail(this.email.value) != true){
                        //     alert('Please enter correct email!')
                        // }else{
                        //     alert('Please check the password again. The password is not confirmed.')
                        // }
                        const checkEmail = ( email ) => {

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
                        const { value: formValues } = await Swal.fire({
                            title: 'Enter the email and password',
                            width: 600,
                            showCancelButton: true,
                            confirmButtonColor: '#eea13c',
                            cancelButtonColor: '#8C8F8D',
                            confirmButtonText: 'Submit',
                            cancelButtonText: 'Cancel',
                            html:
                                '<form role="form">'+
                                    '<div class="form-group row">'+
                                        '<label for="email" class="col-sm-4" style="margin-top:.5em;text-align:left;">Email :</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="email" type="email" class="form-control" placeholder="example@email.com" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row">'+
                                        '<label for="password" class="col-sm-4" style="margin-top:.5em;text-align:left;">Password :</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="password" type="password" class="form-control" placeholder="must have at least 6 characters" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row">'+
                                        '<label for="cpassword" class="col-sm-4" style="margin-top:.5em;text-align:left;">Confirm Password :</label>'+
                                        '<div class="col-sm-8 ">'+
                                            '<input id="cpassword" type="password" class="form-control" placeholder="confirm password again" required/>'+
                                        '</div>'+
                                    '</div>'+
                                '</form>',
                            focusConfirm: false,
                            didOpen : ()=> {
                                // document.getElementById('email').focus()
                                $('#email').blur(function(){
                                    if(checkEmail($('#email').val()) != true) {
                                        Swal.showValidationMessage('Please enter correct email!')
                                    } else {
                                        Swal.resetValidationMessage()
                                    }
                                })
                                $('#password').blur(function(){
                                    if ($('#password').val().length<6) {
                                        Swal.showValidationMessage('The password should at least 6 characters!')
                                    } else {
                                        Swal.resetValidationMessage()
                                    }
                                })
                                $('#cpassword').blur(function(){
                                    if ($('#cpassword').val().length<6) {
                                        Swal.showValidationMessage('The confirm password should at least 6 characters!')
                                    } else {
                                        Swal.resetValidationMessage()
                                    }
                                })
                            },
                            preConfirm: ()=> {
                                if(checkEmail($('#email').val()) != true) {
                                    Swal.showValidationMessage('Please enter correct email!')
                                }
                                if ($('#password').val().length<6) {
                                    Swal.showValidationMessage('Please check the password again!')
                                }
                                if ($('#password').val() != $('#cpassword').val()) {
                                    Swal.showValidationMessage('Please check the password again!\nThe confirm password should be the same with password!')
                                }
                                return [
                                    document.getElementById('email').value,
                                    document.getElementById('password').value,
                                    document.getElementById('cpassword').value
                                ]
                            }
                        })
                        if (formValues) {
                            this.createBackup($('#email').val(),$('#password').val())
                        }
                    }}>
                        {/* <Form.Group id="formBasicEmail">
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
                        <br></br> */}
                        <button type="submit" class="bubtn">Set</button>
                    </Form>

                </div>
                    <p></p>
                    {/* <p><b>Contract address:</b> {this.state.contract_address}</p> */}
                    {/* <p>{this.state.message}</p> */}
                </div>
            </Layout>
        )
    }
}
export default BackupCreatePage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
                <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
                <Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/