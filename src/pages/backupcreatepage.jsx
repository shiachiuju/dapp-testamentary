//dependencies
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import Axios from 'axios'
import sha256 from 'js-sha256';
import $ from 'jquery';
import Swal from 'sweetalert2'
//includes
import '../App.css';
import Layout from '../layout';
//contractabi
// import Backup from '../contract/Backup.json'
import MainContract from '../contract/MainContract.json'
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
        Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        .then((con) => {
            console.log(con.data)
            if(con.data.length == 0){
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
                }).then(() => {
                    window.location = "/Main"
                })
            }else{
                const mainContract = new web3.eth.Contract(MainContract.abi, con.data[0].maincontract_address.toString())
                this.setState({ mainContract});
                this.setState({ mainAddress: con.data[0].maincontract_address.toString()})
                getemail()
            }
        }).catch((err) => {
            
        });
        const getemail = async () => {
            const email = await this.state.mainContract.methods.getEmail().call()
                this.setState({ email })
            const password = await this.state.mainContract.methods.getPassword().call()
                this.setState({ password })
            if (this.state.email !== '' && this.state.password !== ''){
                this.setState({ set: '已建立救援機制' })
                // console.log(this.state.email)
                // console.log(this.state.password)
            }else{
                this.setState({ set: '尚未建立救援機制' });
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
        // this.Deploy = this.Deploy.bind(this);
        // this.Enterinfo = this.Enterinfo.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }
    async createBackup(email, password, idNo) {
        this.hash = sha256(password.toString())
        const setBack = () =>{
            this.state.mainContract.methods.setBackup(email,this.hash,idNo).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.sendEmail(email,this.state.mainAddress)
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
        if (this.state.mail !== '' && this.state.password !== ''){
            if(this.state.mail !== email && this.state.password !== this.hash){
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
            }else{
                new Swal({
                    title: 'Please enter the new email and password',
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
            }
            // alert('Your backup mechanism has been set. \nClick confirm to change a new one!')
            // this.setState({ backup : 'The backup mechanism has been set.'})
        }else{
            setBack()
        }
        // Axios.get(`http://localhost:3002/api/getbackupcontract/${acc}`)
        // .then((con) => {
        //     this.Enterinfo(con.data[0].backupcontract_address.toString(), email, this.hash, idNo);
        // }).catch((err) => {
        //     Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        //     .then((con) => {
        //         this.Deploy(con.data[0].maincontract_address.toString(), email, this.hash, idNo)
        //     }).catch((err) => {
        //         new Swal({
        //             title: 'Please create your account first',
        //             confirmButtonColor: '#eea13c',
        //             confirmButtonText: 'OK',
        //             width: 600,
        //             padding: '3em',
        //             background: '#fff',
        //             backdrop: `
        //                 shadow: '0px 0px 5px #888888'
        //                 left top
        //                 no-repeat
        //             `
        //         }).then(function() {
        //             window.location = "/Main"
        //         });
        //     });
        // });
    }
    // async Enterinfo(address, email, password, idNo) {
    //     const backupContract = new this.state.web3.eth.Contract(Backup.abi, address)
    //     this.setState({ backupContract });
    //     const getemail = await this.state.backupContract.methods.getEmail().call()
    //     this.setState({ getemail })
    //     const setBack = () =>{
    //         this.state.backupContract.methods.setBackup(email,password,idNo).send({ from: this.state.account })
    //         .once('receipt', (receipt) => {
    //             this.sendEmail(email,address)
    //             // this.setState({ message : 'We have sent an e-mail to your mailbox, please check it out!'})
    //             // this.refreshPage()
    //         })
    //         .once('error', (error) => {
    //             new Swal({
    //                 title: 'Transaction has dismissed',
    //                 text: 'Setting remain the same',
    //                 confirmButtonColor: '#eea13c',
    //                 confirmButtonText: 'OK',
    //                 width: 600,
    //                 padding: '3em',
    //                 background: '#fff',
    //                 backdrop: `
    //                     shadow: '0px 0px 5px #888888'
    //                     left top
    //                     no-repeat
    //                 `
    //             }).then(function() {
    //                 window.location.reload()
    //             });
    //         })
    //     }
    //     if (this.state.getemail != '' ){
    //         new Swal({
    //             title: 'Are you sure to change the email and password?',
    //             showCancelButton: true,
    //             confirmButtonColor: '#eea13c',
    //             cancelButtonColor: '#8C8F8D',
    //             confirmButtonText: 'Yes',
    //             cancelButtonText: 'Cancel',
    //             width: 600,
    //             padding: '3em',
    //             background: '#fff',
    //             backdrop: `
    //                 shadow: '0px 0px 5px #888888'
    //                 left top
    //                 no-repeat
    //             `
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 setBack()
    //             }else if(result.dismiss === Swal.DismissReason.cancel){
    //                 window.location.reload()
    //             }
                
    //         });
    //         // alert('Your backup mechanism has been set. \nClick confirm to change a new one!')
    //         // this.setState({ backup : 'The backup mechanism has been set.'})
    //     }else{
    //         setBack()
    //     }
    //     }

    async refreshPage() {
        window.location.reload()
    }
    // async Deploy(mainaddr, email, password, idNo) {
    //     const contract = new this.state.web3.eth.Contract(Backup.abi);
    //     contract.deploy({
    //         data: Backup.bytecode,
    //         arguments: [mainaddr]
    //     })
    //     .send({
    //         from: this.state.account,
    //         gas: 2100000,
    //     })
    //     .then((newContractInstance) => {
    //         console.log('successfully deployed!');
    //         submitNew(mainaddr, newContractInstance.options.address.toString())
    //         this.Enterinfo(newContractInstance.options.address.toString(), email, password, idNo);
    //     }).catch((err) => {
    //         new Swal({
    //             title: 'Transaction has dismissed',
    //             text: 'Please enter the submit on Metamask',
    //             confirmButtonColor: '#eea13c',
    //             confirmButtonText: 'OK',
    //             width: 600,
    //             padding: '3em',
    //             background: '#fff',
    //             backdrop: `
    //                 shadow: '0px 0px 5px #888888'
    //                 left top
    //                 no-repeat
    //             `
    //         }).then(function() {
    //             // this.refreshPage()
    //         });
    //     });
    //     const submitNew = (mainaddr, newcontract) => {
    //         Axios.post('http://localhost:3002/api/insertbackup', { account_address: this.state.account, maincontract_address: mainaddr, backupcontract_address: newcontract })
    //             .then(() => {
    //                 alert('success insert!')
    //             })
    //     }

    // }


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
                width: 700,
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
            
    }

    render() {
        return (
            <Layout>
            {/* <button class="prev" onClick={(event)=>{event.preventDefault();window.location="/Main"}}><FontAwesomeIcon color="white" icon={["fas", "angle-left"]} type="submit" /> Prev</button> */}
            <div class="App">
            <div class="l">            
                <button class="prev font" onClick={(event)=>{event.preventDefault();window.location="/Main"}}><FontAwesomeIcon color="white" icon={["fas", "angle-left"]} type="submit" /> Prev</button>
            </div>
                <br></br>
                <h3 className="font">建立救援機制</h3>
                <br></br>
                {/* <p><b>Wallet account:</b> {this.state.account}</p> */}
                <p className="font" id="f18">{this.state.set}</p>
                <p className="font" id="f18">點選 <b>設定</b> 開始建立</p>
                <br></br>
                <div id="setback">
                    <Form onSubmit={ async (event) => {
                        event.preventDefault()
                        if ( this.state.account == "" ){
                            this.refreshPage()
                        }
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
                        const checkId = ( idNo ) => {
                            var id_string = idNo.toString()
                            var UpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
                            var Location_num = ["10","11","12","13","14","15","16","17","34","18","19","20","21","22","35","23","24","25","26","27","28","29","30","31","32","33"];
                            var getFirstChar = id_string.substr(0,1);
                            var getRestNumber = id_string.substr(1,9);
                            var getFirstChar_num = 0;
                            var haveMatch = 0;
                            if(id_string.length===10){
                                for(var i=0;i<=10;i++){
                                    if(id_string[i]==" "){
                                        return false;
                                    }
                                }
                                for(var j=0;j<=UpperCase.length;j++){
                                    if(getFirstChar==UpperCase[j]){
                                        getFirstChar_num = Location_num[j];
                                        haveMatch = 1;
                                        break;
                                    }
                                }
                                if(isNaN(getRestNumber)){
                                    return false;
                                }else if(haveMatch == 0){
                                    return false;
                                }else{
                                    var digitNum = getFirstChar_num.substr(1,1);
                                    var decNum = getFirstChar_num.substr(0,1);
                                    var calulate = parseInt(digitNum)*9 + parseInt(decNum);
                                    for(var m=1;m<=8;m++){
                                        calulate += parseInt(id_string[m])*(9-m);
                                    }
                                    calulate += parseInt(id_string[9])
                                    var totalcheck = (calulate%10 == 0) ? true : false;
                                    if(totalcheck == true){
                                        return true;
                                    }else{
                                        return false;
                                    }
                                }
                            }else{
                                return false
                            }
                        }
                        const { value: formValues } = await Swal.fire({
                            title: '請輸入資料',
                            width: 600,
                            showCancelButton: true,
                            confirmButtonColor: '#eea13c',
                            cancelButtonColor: '#8C8F8D',
                            confirmButtonText: '提交',
                            cancelButtonText: '取消',
                            html:
                                '<form role="form">'+
                                    '<div class="form-group row font">'+
                                        '<label for="idNo" class="col-sm-4" style="margin-top:.5em;text-align:left;">身分證字號：</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="idNo" type="text" class="form-control" placeholder="ID number" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row font">'+
                                        '<label for="email" class="col-sm-4" style="margin-top:.5em;text-align:left;">電子郵件信箱：</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="email" type="email" class="form-control" placeholder="example@email.com" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row font">'+
                                        '<label for="password" class="col-sm-4" style="margin-top:.5em;text-align:left;">密碼：</label>'+
                                        '<div class="col-sm-8">'+
                                            '<input id="password" type="password" class="form-control" placeholder="must have at least 6 characters" required/>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="form-group row font">'+
                                        '<label for="cpassword" class="col-sm-4" style="margin-top:.5em;text-align:left;">再輸入一次密碼：</label>'+
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
                                $('#idNo').blur(function(){
                                    if ($('#idNo').val().length !== 6) {
                                        Swal.showValidationMessage('The ID numebr should be 10 characters!')
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
                                if(checkId($('#idNo').val()) != true) {
                                    Swal.showValidationMessage('Please enter correct ID number!')
                                }
                                return [
                                    document.getElementById('email').value,
                                    document.getElementById('password').value,
                                    document.getElementById('cpassword').value,
                                    document.getElementById('idNo').value
                                ]
                            }
                        })
                        if (formValues) {
                            this.createBackup($('#email').val(),$('#password').val(),$('#idNo').val())
                        }
                    }}>
                        <button type="submit" class="bubtn font">設定</button>
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