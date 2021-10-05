//dependencies
import React, { Component } from 'react'
import { Button, Col} from 'react-bootstrap'
import ReactFullpage from '@fullpage/react-fullpage';
//includes
import '../App.css';
import Layout from '../layout';




class EnterPage extends Component {
    componentDidMount() {
        this.loadBlockchainData()
        
    }

    async loadBlockchainData() {
        
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
                
            <div className="app">
                <div class="welcome" >
                    <div class="r">
                        <br></br>
                        <p>sal<b>VA</b>ger<br></br>虛擬資產我救的</p>
                    </div>
                </div>   
                <div class="about" >
                    <div class="a">
                        <p class="b"><b>關於</b>sal<b>VA</b>ger</p>
                        <br></br>
                        <br></br>
                        <p>您知道嗎，自加密貨幣風行至今，因私鑰遺失或所有權人死亡而遺失的加密貨幣價值超過數千億美金。</p>
                        <br></br>
                        <p>為降低您遺失錢包之風險，<b>salVAger</b>提供救援機制與遺產分配機制，讓您可以更安心的持有加密貨幣。</p>
                        <br></br>
                        <Button class="button" href="/Main" variant="outline-warning">立即開始使用</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div class="welcome" >
                    <div class="le">
                    <br></br>   
                    <p><b>救援機制</b></p>
                    <p class="o">救援機制做得好，讓你買幣沒煩惱!</p>
                    <br></br>
                    <p class="bl">只需要電子郵件及帳號密碼，我們會為您建立<br></br>一份救贖合約，如同一個備援錢包。<br></br></p>
                    <p class='bl'>當您遺失原本的錢包，即可至平台啟用您的新錢<br></br>包，您原本儲存於合約的加密貨幣會於啟用後立即轉入。</p>
                    <Button class="button" href="/Main" variant="btn btn-dark">建立我的救援合約/設定我的新錢包</Button>
                    </div>
                    <div class="" id="leftenter">
                    <div class="bimg" align="right" ></div></div>
                </div>   
                <div class="welcome2" >
                    <div class="le">
                    <br></br>   
                    <p><b>遺產分配機制</b></p>
                    <p class="o2">讓您的加密貨幣如鑽石價值永流傳</p>
                    <br></br>
                    <p class="bl2">只需要您所要分配之受益人的電子郵件與<br></br>身分證字號，我們將提供您一份可以隨時<br></br>修改的遺產分配合約。<br></br><br></br>不論是繼承人或分配額度，都能如您所願，<br></br>保障您的加密貨幣價值可以永久傳承。</p>
                    <Button class="button" href="/Main" variant="btn btn-dark">建立我的遺囑合約/取得我的繼承資產</Button>
                    </div>
                    <div class="" id="leftenter">
                    <div class="wimg" align="right"></div>
                    </div>
                </div>
                </div>
                            
                <div class="article section2 welcome center">
                <p class="big">By this two function, <br></br>we can ensure that all the virtual currency can be circulated, and not wasted</p>
                <br></br>
                    <div id="leftenter">
                    <p>Create your own back-up mechanism or testamentary</p>
                    <Button class="button" href="/Main" variant="outline-warning">Create your own.</Button>
                    </div>
                    <div id="rightenter">
                    <p>Activate your own back-up mechanism or testamentary</p>
                    <Button href="/ActivateMain" variant="outline-warning">Activate.</Button>
                    </div>
                </div>
                           
                                
                         
            
            </Layout> 
        ) 
    }
}
export default EnterPage;

/*<Nav.Link href="/Backup">Create</Nav.Link>
<Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>
 <Col md={{ span: 12 }}><h5><b>GVA(Guardian of Virtual Assets) gives your assets GVA(Gross value added)</b></h5></Col>
 <br></br>
                                <div data-azbox="" data-gjs-type="agjc-box" id="leftenter">
                                    <div class="bimg center" ></div>
                                    <div class="big center" >Backup-mechanism</div>
                                </div>
                                <div data-azbox="" data-gjs-type="agjc-box" id="rightenter">
                                    <div class="wimg center"></div>
                                    <div class="big center">Testamentary </div>  
                                </div>
                                    
                                <div data-azbox="" data-gjs-type="agjc-box" id="leftenter" >
                                    
                                <p >You can set the backup contract in advance. <br></br>Once if you lost your wallet password, you can come here to activate the backup contract<br></br>Then all your virtual currency in the previous wallet will be return to your new wallet.</p>    
                                </div>
                                 <div id="rightenter" >
                                <br></br>
                                <p>The testament function is for people who are willing to distribute their property secretly.<br></br>Testators can add more than one beneficiaries with the customized percentage</p>
                                <p> (N.B. Each proportion of designated beneficiary should add up to 100% )</p>
                                          
                                </div>
                               */