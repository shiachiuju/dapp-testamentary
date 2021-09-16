//dependencies
import React, { Component } from 'react'

//includes
import '../App.css';
import Layout from '../layout';
import getWeb3 from '../getWeb3'


class ActivateMainPage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
        
    }

    async loadBlockchainData() {
        const web3 = await getWeb3();
        this.setState({ web3: web3 })
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }
    constructor(props) {
        super(props)
        this.state = {
            account: '',
        }
        
    }
    async refreshPage() { 
        window.location.reload()
    }
    
    render() {
        return (
            <Layout>
            <div className="App textstyle">
                <div id="mainbox">
                
                <div id="outer">
                
                <p><h4><b>Welcome,{this.state.account}</b></h4></p>
                <h5><b>Here you can activate your contracts:</b></h5>
                
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
                <form method="get" action="/SetTestament">
                <button class="button" type="submit">Set/Activate Testament</button>
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