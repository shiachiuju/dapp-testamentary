//dependencies
import React, { Component } from 'react'
import { Button, Col} from 'react-bootstrap'
import $ from 'jquery';
import Swal from 'sweetalert2'
//includes
import '../App.css';
import Layout from '../layout';


class EnterPage extends Component {
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
    /*
    <style>
					.button {
    				background-color: #4CAF50,
    				border: none,
    				color: white,
    				padding: 15px 32px,
    				text-align: center,
    				text-decoration: none,
    				display: inline-block,
    				font-size: 16px,
    				margin: 4px 2px,
    				cursor: pointer,
					}
				</style>
    */
    
    render() {
        return (
            <Layout>
            <div className="App">
                <br></br>
                <div id="mainbox">
                <br></br>
                
                <Col md={{ span: 6 }}><p>About us:</p></Col>
                <Col md={{ span: 6 , offset: 3 }}>
                <p>What if we lose our password for virtual wallet?</p>
                <p>What if we die without making our testamentary?</p>
                <p>All the virtual currency we gained will become meaningless.</p>     
                <p>Here, we can protect your virtual currency from losing or wasting.</p>
                </Col>
                <br></br>
                <div id="outer">
                <div data-azbox="" data-gjs-type="agjc-box" id="leftenter">
                
				
                <p><b>Create your own back-up macheniam or testamentary</b></p>

                <form method="get" action="/Backup">
                    <Button href="/Join" variant="outline-warning">Create your own.</Button>
                </form></div>

                <div data-azbox="" data-gjs-type="agjc-box" id="rightenter">
                
                
				<p><b>Activate your own back-up macheniam or testamentary</b></p>

				<form method="get" action="/TestaManage">
                    <Button href="/ActivateMain" variant="outline-warning">Activate.</Button>
                </form></div>
			</div>
                <br></br>
                
                </div>
            </div>
            </Layout> 
        ) 
    }
}
export default EnterPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/