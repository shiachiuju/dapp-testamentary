//dependencies
import React, { Component } from 'react'
import { Button, Col} from 'react-bootstrap'
import $ from 'jquery';
import Swal from 'sweetalert2'
//includes
import '../App.css';
import Layout from '../layout';


class ActivateMainPage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
        
    }

    async loadBlockchainData() {
        //web3
        // const web3 = await getWeb3();
        // this.setState({ web3: web3 })
        // //netid
        // const netId = await web3.eth.net.getId();
        // this.setState({ netid: netId })
        // //wallet accounts
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        // const Contract = require('web3-eth-contract');
        // const contract = new web3.eth.Contract(MainContract.abi);
        // contract.deploy({
        //     data: MainContract.bytecode
        //     // arguments: [123, 'My String']
        // })
        // .send({
        //     // from: '0x1234567890123456789012345678901234567891',
        //     from: accounts[0],
        //     gas: 2100000,
        //     // gasPrice: '30000000000000'
        // })
        // .then((newContractInstance) => {
        //     console.log('successfully deployed!');
        //     console.log(newContractInstance.options.address);
        //     this.setState({
        //         contractAddress: newContractInstance.options.address
        //     })
        // }).catch((err) => {
        //     console.log(err);
        // });
    }
    constructor(props) {
        super(props)
        this.state = {
        }
        // this.Deploy=this.Deploy.bind(this);
        
    }
    async refreshPage() { 
        window.location.reload()
    }
    // async truffledeploy() {
    //     const contract = require('truffle-contract')
    //     const mainContract = contract(MainContract)
    //     let mainContractInstance
    //     mainContract.setProvider(this.state.web3.currentProvider)
    //     mainContract.deployed().then((instance) => {
    //         mainContractInstance = instance
    //         this.setState({instance: mainContractInstance})
    //         this.setState({
    //             contractAddress: mainContractInstance.address
    //         })

    //     })
    // }
    // async Deploy() {
    //     const contract = new this.state.web3.eth.Contract(MainContract.abi);
    //     contract.deploy({
    //         data: MainContract.bytecode
    //         // arguments: [123, 'My String']
    //     })
    //     .send({
    //         // from: '0x1234567890123456789012345678901234567891',
    //         from: this.state.account,
    //         gas: 2100000,
    //         // gasPrice: '30000000000000'
    //     })
    //     .then((newContractInstance) => {
    //         console.log('successfully deployed!');
    //         console.log(newContractInstance.options.address);
    //         this.setState({
    //             contractAddress: newContractInstance.options.address
    //         })
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    
    render() {
        return (
            <Layout>
            <div className="App">
                
        
                
                <div id="mainbox">
                
                <div id="outer">
                <br></br>
                <br></br>
                <br></br>
                <p>Welcome,Here you can activate your contracts:</p>
                </div>
                <div data-azbox="" data-gjs-type="agjc-box" id="left">
                <p>If you forget the password of your virtual account:</p>
                <p>You can press <b>"Activate Back-up"</b> to Activate your back-up machanism.</p>
                <br></br>
                
                <form method="get" action="/ActivateBackup">
                <button class="button" type="submit">Activate Back-up</button>
                </form></div>

                <div data-azbox="" data-gjs-type="agjc-box" id="right">
                <p>As a beneficiary ,</p>
                
                <p>You can press <b>"Activate Testamentary"</b> to set and activate the testamentary if needed.</p>
                <br></br>
                <form method="get" action="/ActivateTestament">
                <button class="button" type="submit">Activate Testament</button>
                </form></div>
                </div>
                
            </div>
            <br></br>
            
            </Layout> 
        ) 
    }
}
export default ActivateMainPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/