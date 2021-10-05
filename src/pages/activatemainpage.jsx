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
                <div id="mainbox ">
                    <div id="outer">
                        <h2 className="font">您好，</h2>
                        <h4 className="font"><b>{this.state.account}</b></h4>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <h4 className="font"><b>salVAger</b> 提供 帳戶救援 與 帳後遺囑 功能：</h4>
                    <div id="outerdown">
                        <div data-azbox="" data-gjs-type="agjc-box" id="left">
                            <p className="font" id="f18">原有帳號私鑰已遺失</p>
                            <p className="font" id="f18">請按 <b> 啟動救援 </b> 以啟用救援合約</p>
                            <form method="get" action="/ActivateBackup">
                                <button class="button font" type="submit">啟動救援</button>
                            </form>
                        </div>
                        <div data-azbox="" data-gjs-type="agjc-box" id="right">
                            <p className="font" id="f18">收到受益人確認信</p>
                            <p className="font" id="f18">請按 <b> 啟動遺囑 </b> 以確認身份或啟用遺產分配合約</p>
                            <form method="get" action="/SetTestament">
                                <button class="button font" type="submit">啟動遺囑</button>
                            </form>
                        </div>
                    </div>
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