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

    async testaEth(address,checkemail,checkpassword,checkid) {
        const spContract = new this.state.web3.eth.Contract(Setpassword.abi, address)
        this.setState({ spContract });
        console.log(address);
        this.state.spContract.methods.passset(checkemail, checkpassword, checkid).send({ from: this.state.account })
        .then(() => {
            this.refreshPage()
        })
    }

    async Deploy(addr,checkemail,checkpassword,checkid) {
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
            this.testaEth(newContractInstance.options.address.toString(),checkemail,checkpassword,checkid)     
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

    async Set(contractadd,checkemail,checkpassword,checkid){
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${contractadd}`)
        .then(() => {
            Axios.get(`http://localhost:3002/api/getsetcontract/${acc}/${contractadd}`)
            .then((con) => {
                this.testaEth(con.data[0].settestamentcontract_address.toString(),checkemail,checkpassword,checkid)
            }).catch((err) => {
                this.Deploy(contractadd,checkemail,checkpassword,checkid)
            });
        }).catch((err) => {
            alert('this address not create!')
        });
    }

    async refreshPage() { 
        window.location.reload()
    }

    //Activate
    /*async checkset(setpassaddr,checkpassword) {
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getsetcontracttttt/${acc}/${setpassaddr}`)
        .then((con) => {
            this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
        }).catch((err) => {
            console.log('err')
        });
    }*/
    async checkset(setpassaddr,checkpassword) {
        const acc = this.state.account
            Axios.get(`http://localhost:3002/api/getsetcontracttttt/${acc}/${setpassaddr}`)
            .then((con) => {
                this.activate(con.data[0].settestamentcontract_address.toString(),checkpassword)
            }).catch((err) => {
                console.log(setpassaddr)
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
                <h3 className="font">輸入遺囑資訊</h3>
                <br></br>
                <div class="form-group" id="activateTest">
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        this.Set(this.contractadd.value,this.checkemail.value,this.checkpassword.value,this.checkid.value)
                    }}>
                        <Col>
                            <label for="formCheckAddress" class="acbulabel font">遺囑合約地址：</label>
                            <input
                            class="acbuinput font" 
                            id="formCheckAddress" 
                            type="text" 
                            ref={(input) => { 
                                this.contractadd = input
                            }}
                            placeholder="Paste Testamant Address Here"
                            required/>
                        </Col>
                        <Col>
                            <label for="formCheckEmail" class="acbulabel font">電子郵件信箱：</label>
                            <input
                            class="acbuinput font" 
                            id="formCheckEmail" 
                            type="email" 
                            ref={(input) => { 
                                this.checkemail = input
                            }}
                            placeholder="Enter email"
                            required/>
                        </Col>
                        <Col>
                            <label for="formCheckId" class="acbulabel font">身分證字號：</label>
                            <input
                            class="acbuinput font" 
                            id="formCheckId" 
                            type="text" 
                            minLength="10" 
                            maxLength="10"
                            ref={(input) => { 
                                this.checkid = input
                            }}
                            placeholder="Enter ID number"
                            required/>
                        </Col>
                        <Col>
                            <label for="formCheckPassword" class="acbulabel font">密碼：</label>
                            <input
                            class="acbuinput font" 
                            id="formCheckPassword" 
                            type="password"
                            minLength="6" 
                            maxLength="8"
                            ref={(input) => { 
                                this.checkpassword = input
                            }}  
                            placeholder="Password(6~8)"
                            required/>
                        </Col>
                        <br></br>
                        <button type="submit" class="bubtn font">加入遺囑</button>
                    </Form>
                    <br></br>
                </div>
                <div class="table-responsive">
                <table class="table table-hover table-sm cc">
                    <thead className="font">
                        <tr>
                            <th scope="col">遺囑合約地址</th>
                            <th scope="col">設定合約地址</th>
                            <th scope="col">合約狀態</th>
                            <th scope="col">啟用合約</th>
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
                                        title: '輸入資料啟動合約',
                                        width: 600,
                                        showCancelButton: true,
                                        confirmButtonColor: '#eea13c',
                                        cancelButtonColor: '#8C8F8D',
                                        confirmButtonText: '提交',
                                        cancelButtonText: '取消',
                                        html:
                                            '<form role="form">'+
                                                '<div class="form-group row font">'+
                                                    '<label for="contract" class="col-sm-4" style="margin-top:.5em;text-align:left;">已建立合約地址：</label>'+
                                                    '<div class="col-sm-8">'+
                                                        '<input id="contract" class="form-control" placeholder="Paste Your Set Address Here" required/>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="form-group row font">'+
                                                    '<label for="password" class="col-sm-4" style="margin-top:.5em;text-align:left;">密碼：</label>'+
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
                                <button type="submit" class="actestbtn font">啟動</button>
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
