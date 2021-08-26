//dependencies
import React, { Component } from 'react'
import { Button, Col} from 'react-bootstrap'

//includes
import '../App.css';
import Layout from '../layout';


class JoinPage extends Component {
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
                <br></br>
                <br></br>
                <Col md={{ span: 6 }}><p>About us:</p></Col>
                <Col md={{ span: 6 , offset: 3 }}>
                <p>What if we lose our password for virtual wallet?</p>
                <p>What if we die without making our testamentary?</p>
                <p>All the virtual currency we gained will become meaningless.</p>     
                <p>Here, we can protect your virtual currency from losing or wasting.</p>
                </Col>
                <br></br>
                <p><b>Press join to start your own testamentary trust mechanism.</b></p>
                <br></br>
                <Button size="lg" href="/Main" variant="outline-warning">Join !</Button>
                {/* <p>{this.state.contractAddress}</p> */}
            </div>
            </Layout> 
        ) 
    }
}
export default JoinPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>*/