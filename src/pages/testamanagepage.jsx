import React, { Component } from 'react'
import { Button, Form} from 'react-bootstrap'
import getWeb3 from '../getWeb3'
import '../App.css';
import Layout from '../layout';
import Axios from 'axios'
import MainContract from '../contract/MainContract.json'
import emailjs, { init } from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
init("user_hGl6i7zIJBqfYWp8WEBfY");

class TestaManagePage extends Component{
    
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
        //contract address
        const acc = this.state.account
        Axios.get(`http://localhost:3002/api/getcontract/${acc}`)
        .then((con) => {
            const mainContract = new web3.eth.Contract(MainContract.abi, con.data[0].maincontract_address.toString())
            this.setState({ mainContract });
            this.getinfo();
            this.setState({ contract_address: con.data[0].maincontract_address.toString()})
            console.log(con.data[0].maincontract_address);
        }).catch((err) => {
            console.log(err);
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
        const len = await this.state.mainContract.methods.returnlen().call()
        this.setState({ len })
        for(let i=0;i<this.state.len;i++) {
            const checkbenes = await this.state.mainContract.methods.getBeneficiary(i).call()
            const a = this.state.benes
            a.push({mail: checkbenes[0],rate: checkbenes[1]})
            this.setState({ benes: a })
        }
        

    }

    constructor(props) {
        super(props)
        this.state = {
            beneficiary:[{mail:"",idnumber:"",rate:""}],
            benes:[],
            message: '',
            value:[],
        }
        this.addHa = this.addHa.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.modify = this.modify.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    async addHa(mail,idnumber,rate) {
        const submitBeneInfo = (mail,rate) => {
            Axios.post('http://localhost:3002/api/add', {account_address: this.state.account, bene_mail: mail, bene_rate: rate})
            .then(() => {
                alert('success insert!')
            })
        }
        this.sendEmailtoB(mail)
        this.setState({ message:'We have sent an e-mail to your mailbox, please check it out!' })
        this.state.mainContract.methods.addbene(mail,rate,idnumber).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            submitBeneInfo(mail,rate)
            console.log('successfully deployed!');
            //this.sendEmailtoB(this.mail.value)
            //this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!' })
        })
        // .then((mail,rate) => {
        //     // const int_rate = parseInt(rate,10)
        //     submitBeneInfo(mail,rate)
        //     console.log('successfully deployed!');
        //     // this.refreshPage()
        // })
        .catch((err) => {
            console.log(err);
        });
    }

    async refreshPage() { 
        window.location.reload()
    }
    async modify(id,mail,newrate) {
        this.state.mainContract.methods.modifybene(id,mail,newrate).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            // alert('receipt')
        })
        .once('error', (error) => {
        })
    }
    addBene=(e)=>{
        this.setState((prevState)=>({
           beneficiary:[...prevState.beneficiary,{mail:"",rate:""}] 
        }))
    }
    
    handleSubmit = (e) => { e.preventDefalut() }

    sendEmailtoB(e) {

        let service_id = "beautygang";
        let template_id = "testamentary";
        let name = e.split('@')[0];
        let testamen = this.state.account;

        const mainContract = this.state.contract_address;


        emailjs.send(service_id, template_id, {
            to_name: name,
            email: e,

            message: "Here to notify that you have been set as one of " + testamen + "'s beneficiaries.  "+'\n'+"      Get your contract_address:  "+mainContract+"  to set up your own password.",

            subject: 'Notification'
        });
        this.setState({ message: "We have sent an e-mail to your beneficiary's mailbox, please check it out!" })

    }

    sendEmailtoT(e) {
        let service_id = "beautygang";
        let template_id = "testamentary";
        let testamen = this.state.account;

        emailjs.send(service_id, template_id, {
            to_name: testamen,
            userMail: e,
            message: "Your testamentary has been set.",
            subject: "Notification"
        });
        this.setState({ message: 'We have sent an e-mail to your mailbox, please check it out!' })

    }

    checkEmail = (email) => {

        // checkemail
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            // this is a valid email address
            return true
        }
        else {
            // invalid email, show an error to the user.
            return false
        }

    }
    getnewemail(id){
        this.state.beneficiary.map((val,idx)=>{
            if (id ===idx){
                if (val != undefined){
                    return "val"
                }else{
                    return "Enter"
                }
            }
            
        })
    }
    render() {
        // let {beneficiary} = this.state
        return (
        <Layout>
            <div className="App">
            <div class="l">            
                <button class="prev font" onClick={(event)=>{event.preventDefault();window.location="/Main"}}><FontAwesomeIcon color="white" icon={["fas", "angle-left"]} type="submit" /> Prev</button>
            </div>
            <h3 className="font">建立數位遺囑</h3>
            <br></br>
    
            <Form>
            <p></p>
            <div align="center">
            <div class="table-responsive">
                <table class="table table-hover table-sm cc">
                <thead className="font">
                    <tr>
                        <th scope="col" className="font">電子郵件</th>
                        <th scope="col" className="font">分配比例</th>
                        <th scope="col" className="font">修改分配比例</th>
                        {/* <th scope="col" className="font"></th> */}
                    </tr>
                </thead>
                {this.state.benes.map((val, key) =>{
                if (this.state.value.length === 0) {
                    if(key===0){
                        return(
                            <tbody className="font">
                            <tr>
                                <td>{val.mail}</td>
                                <td>{val.rate}</td>
                            </tr>
                        </tbody>
                        )
                    }else{
                    var beneId=`bene-${key}`
                    return(
                        <tbody className="font">
                            <tr>
                                <td>{val.mail}</td>
                                <td>{val.rate}</td>
                                <td><button type="button" class="mobtn font"
                                onClick={
                                    ()=>{
                                        const a = this.state.value
                                        a.push(key)
                                        this.setState({ value: a })
                                        // console.log(key)
                                        // console.log(this.state.value.toString())
                                    }
                                }
                                >修改</button></td>
                                {/* <td></td> */}
                            </tr>
                        </tbody>
                    )}
                }
                })}
                {this.state.benes.map((val, key) =>{
                if(this.state.value.length !== 0){
                    if(key===0){
                        return(
                            <tbody className="font">
                            <tr>
                                <td>{val.mail}</td>
                                <td>{val.rate}</td>
                            </tr>
                        </tbody>
                        )
                    }else{
                    var beneId=`bene-${key}`
                    var a = <button type="button" class="mobtn font"
                            onClick={
                                ()=>{
                                    const a = this.state.value
                                    a.push(key)
                                    this.setState({ value: a })
                                    // console.log(key)
                                    // console.log(this.state.value.toString())
                                }
                            }
                            >修改</button>;
                    // var b = null;
                    for(var i=0;i<=this.state.value.length;i++){
                        this.state.value.map((val2, key2) =>{
                            if (val2.toString()===key.toString()) {
                                a = <div>
                                    <input 
                                    className="modifyinput"
                                    type="number" 
                                    onChange={(e) => {
                                        this.setState(()=> ({
                                            benes: this.state.benes.map((item, j) => {
                                                if (j === key) {
                                                    return {
                                                        ...item,
                                                        newrate: e.target.value
                                                    }
                                                }
                                    
                                                return item
                                            })
                                        }))
                                    }}>
                                    </input>
                                    <span>{"  "}</span>
                                    <FontAwesomeIcon
                                    color="red"
                                    icon={["fas", "times"]} 
                                    type="submit" 
                                    // class={beneId}
                                    onClick={
                                        ()=>{
                                            var no = [...this.state.value]
                                            no.splice(key2,1)
                                            this.setState({ value: no })
                                            // console.log(no)
                                            // console.log(this.state.value)
                                            // console.log(this.state.value.toString())
                                            this.setState(()=> ({
                                                benes: this.state.benes.map((item, j) => {
                                                    if (j === key) {
                                                        return {
                                                            ...item,
                                                            newrate: undefined
                                                        }
                                                    }
                                        
                                                    return item
                                                })
                                            }))
                                            // console.log(this.state.benes)

                                        }
                                    }/>
                                    </div>
                                    ;
                            }
                        })
                    }
                    return(
                        <tbody className="font">
                            <tr>
                                <td>{val.mail}</td>
                                <td>{val.rate}</td>
                                <td>{a}</td>
                                {/* <td>{b}</td> */}
                            </tr>
                        </tbody>
                    )}
                    }
                })}
                </table>
            </div>
            
            </div>
            <Button variant="warning" onClick={this.addBene} className="font">新增受益人</Button>
            {   this.state.beneficiary.map((val,idx)=>{
                    let beneficiaryId=`beneficiary-${idx}`,Idnumber=`id-${idx}`, rateId=`rate-${idx}`
                    if (val.mail !== "" && val.idnumber !== "" && val.rate !== ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                        return(
                            <div key={idx}>
                            <br></br>
                            <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                            &nbsp;
                            {emailinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={Idnumber}>身分證字號：</label>
                            &nbsp;
                            {idinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={rateId}>分配比例：</label>
                            &nbsp;
                            {rateinput}
                            &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                            </div>
                        )
                    }
                    if (val.mail !== "" && val.idnumber !== "" && val.rate === ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value=''
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                            return(
                                <div key={idx}>
                                <br></br>
                                <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                                &nbsp;
                                {emailinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={Idnumber}>身分證字號：</label>
                                &nbsp;
                                {idinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={rateId}>分配比例：</label>
                                &nbsp;
                                {rateinput}
                                &nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                                </div>
                            )
                    }
                    if (val.mail !== "" && val.idnumber == "" && val.rate !== ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                        return(
                            <div key={idx}>
                            <br></br>
                            <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                            &nbsp;
                            {emailinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={Idnumber}>身分證字號：</label>
                            &nbsp;
                            {idinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={rateId}>分配比例：</label>
                            &nbsp;
                            {rateinput}
                            &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                            </div>
                        )
                    }
                    if (val.mail == "" && val.idnumber !== "" && val.rate !== ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                        return(
                            <div key={idx}>
                            <br></br>
                            <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                            &nbsp;
                            {emailinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={Idnumber}>身分證字號：</label>
                            &nbsp;
                            {idinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={rateId}>分配比例：</label>
                            &nbsp;
                            {rateinput}
                            &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                            </div>
                        )
                    }
                    if (val.mail === "" && val.idnumber === "" && val.rate !== ""){
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value=''
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                            return(
                                <div key={idx}>
                                <br></br>
                                <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                                &nbsp;
                                {emailinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={Idnumber}>身分證字號：</label>
                                &nbsp;
                                {idinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={rateId}>分配比例：</label>
                                &nbsp;
                                {rateinput}
                                &nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                                </div>
                            )
                    }
                    if (val.mail !== "" && val.idnumber == "" && val.rate == ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                        return(
                            <div key={idx}>
                            <br></br>
                            <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                            &nbsp;
                            {emailinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={Idnumber}>身分證字號：</label>
                            &nbsp;
                            {idinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={rateId}>分配比例：</label>
                            &nbsp;
                            {rateinput}
                            &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                            </div>
                        )
                    }
                    if (val.mail == "" && val.idnumber !== "" && val.rate == ""){
                        var newe = val.mail;
                        var newi = val.idnumber;
                        var newr = val.rate;
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newe}
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newr}
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                        return(
                            <div key={idx}>
                            <br></br>
                            <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                            &nbsp;
                            {emailinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={Idnumber}>身分證字號：</label>
                            &nbsp;
                            {idinput}
                            &nbsp;&nbsp;&nbsp;
                            <label htmlFor={rateId}>分配比例：</label>
                            &nbsp;
                            {rateinput}
                            &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                            </div>
                        )
                    }
                    if (val.mail === "" && val.idnumber === "" && val.rate === ""){
                        var emailinput =
                            <input
                            type="email"
                            name={beneficiaryId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                mail: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value=''
                            data-id={idx}
                            id={beneficiaryId}
                            placeholder="Enter email"
                            className="mail newbeneinput font"/>;
                        var idinput =
                            <input
                            type="text"
                            name={Idnumber}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                idnumber: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value={newi}
                            data-id={idx}
                            id={Idnumber}
                            placeholder="Enter ID"
                            className="idnumber newbeneinput font"/>;
                        var rateinput = 
                            <input
                            type="number"
                            name={rateId}
                            onChange={(e) => {
                                this.setState(() => ({
                                    beneficiary: this.state.beneficiary.map((item, j) => {
                                        if (j === idx) {
                                            return {
                                                ...item,
                                                rate: e.target.value
                                            }
                                        }
                            
                                        return item
                                    })
                                }))
                            }}
                            value=''
                            data-id={idx}
                            id={rateId}
                            placeholder="0~100"
                            className="rate newbenerateinput font"/>;
                            return(
                                <div key={idx}>
                                <br></br>
                                <label htmlFor={beneficiaryId}>#{idx+1} 受益人電子郵件：</label>
                                &nbsp;
                                {emailinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={Idnumber}>身分證字號：</label>
                                &nbsp;
                                {idinput}
                                &nbsp;&nbsp;&nbsp;
                                <label htmlFor={rateId}>分配比例：</label>
                                &nbsp;
                                {rateinput}
                                &nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon 
                                color="red" 
                                icon={["fas", "times"]} 
                                type="submit"  
                                onClick={
                                    ()=>{
                                        var nob = [...this.state.beneficiary]
                                        nob.splice(idx,1)
                                        this.setState({ beneficiary: nob })
                                        // console.log(a)
                                        console.log(nob)
                                        console.log(this.state.beneficiary)
                                        this.state.beneficiary.map((v,i)=>{
                                            console.log(v)
                                            // console.log(v.rate)
                                            console.log(i)
                                        })
                                        
                                    }
                                }
                                />
                                </div>
                            )
                    }
                    
                    
                })
            }        
            <br></br>
            <br></br>
            <Button variant="outline-warning" onClick={(event) => {
                event.preventDefault()
                var count = 100
                for(let i = 0;i<=this.state.beneficiary.length;i++){
                    this.state.beneficiary.map((data, j) => {
                        if (j === i) {
                            const mail = data.mail
                            const idnumber = data.idnumber
                            const rate = data.rate
                            if (this.checkEmail(mail) == true) {
                                count-=rate
                            }
                            else{
                                alert('Please enter correct email!')
                            }
                        }
                        
                    })
                }
                for(let i = 0;i<this.state.len;i++){
                    this.state.benes.map((val, key) => {
                        if (key === i) {
                            const newrate = val.newrate
                            const rate = val.rate
                            // console.log(newrate,rate)
                            // console.log(count)
                            if (newrate == undefined){
                                count-=parseInt(rate,10)
                            }else if(newrate == ""){
                                count-=parseInt(rate,10)
                            }else{
                                count-=newrate
                            }
                        }
                    }        
                )}
                if (count === 0){
                    for(let i = 0;i<=this.state.beneficiary.length;i++){
                        const a = this.state.benes
                        this.state.beneficiary.map((data, j) => {
                            if (j === i) {
                                const mail = data.mail
                                const idnumber = data.idnumber
                                const rate = data.rate
                                if (this.checkEmail(mail) === true) {
                                    //this.sendEmailtoB(this.mail.value)
                                    this.addHa(mail, idnumber, rate)
                                } else if (this.checkEmail(mail) !== true) {
                                    alert('Please enter correct email!')
                                }
                                // this.addHa(id, rate)
                            }
                            
                        })
                        
                    }
                    for(let i = 0;i<this.state.len;i++){
                        this.state.benes.map((val, key) => {
                            if (key === i) {
                                const mail = val.mail
                                const idnumber = val.idnumber
                                const newrate = val.newrate
                                const rate = val.rate
                                if (newrate !== "" && newrate !== undefined && rate !== newrate){
                                    this.modify(i,mail,newrate)
                                }
                            }
                        }        
                    )}
                }else{
                    alert('The distribution rate should be added to 100 %')
                }
                // if (this.checkEmail(this.mail.value) == true) {
                //     //this.sendEmailtoB(this.mail.value)
                //     this.addHa(this.mail.value, this.rate.value)
                    
                // } else if (this.checkEmail(this.mail.value) != true) {
                //     alert('Please enter correct email!')
                // }
            }}>建立</Button>
            </Form>
            <br></br>
            <p></p>
            <br></br>
            <br></br>
            </div>
             
        </Layout>
        ) 
    }
}
export default TestaManagePage