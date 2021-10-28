//dependencies
import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import ReactFullpage from "@fullpage/react-fullpage";
//includes
import "../App.css";
import Layout from "../layout";

class EnterPage extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }
  async loadBlockchainData() {}

  constructor(props) {
    super(props);
    this.state = {};
    // this.Deploy=this.Deploy.bind(this);
  }
  async refreshPage() {
    window.location.reload();
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
          <ReactFullpage
            //上面的参数设置都写在这里，不用再写在构造函数里面
            navigation={true}
            sectionsColor={[
              "#dd7538",
              "#faf0e6",
              "#dd7538",
              "#faf0e6",
              "#faf0e6",
            ]}
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  <div className="section">
                    <div class="welcome r">
                      <br></br>
                      <p>
                        sal<b>VA</b>ger—<br></br>虛擬資產我救的
                      </p>
                      <div class="" id="right1enter">
                        <div class="himg" align="right"></div>
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <div class="a">
                      <p class="b">
                        關於sal<b>VA</b>ger
                      </p>
                      
                      <br></br>
                      <p class="bt">
                        您知道嗎，自加密貨幣風行至今<br></br>
                        因私鑰遺失或所有權人死亡而遺失的加密貨幣價值超過數千億美金。
                      </p>
                      <br></br>
                      <p class="bt">
                        為降低您遺失錢包之風險，<b>salVAger</b>
                        提供救援機制與遺產分配機制<br></br>
                        讓您可以更安心的持有加密貨幣。
                      </p>
                      <br></br>


                      <Button
                        class="button"
                        href="/Main"
                        variant="outline-warning"
                      >
                        立即開始使用
                      </Button>
                      <br></br>
                      <br></br>
                      <br></br>
                    </div>
                  </div>

                  <div className="section">

                    <div id="left3enter">
                      <br></br>
                      <p class="bb">
                        <b>救援機制</b>
                      </p>
                      <p class="o">救援機制做得好，讓你買幣沒煩惱!</p>
                      <br></br>
                      <p class="bl">
                        只需要電子郵件及帳號密碼，我們會為您建立<br></br>
                        一份救贖合約，如同一個備援錢包。<br></br>
                        <p></p>
                        當您遺失原本的錢包，即可至平台啟用您的新錢包，<br></br>
                        您原本儲存於合約的加密貨幣會於啟用後立即轉入。
                      </p>
                      <br></br>
                      <div class="backup">
                        <Button href="/Main" variant="btn btn-dark">
                          建立我的救援合約/設定我的新錢包
                        </Button>
                      </div>
                    </div>

                    <div id="right3enter">
                      <div class="bimg" align="left"></div>
                    </div>
                  </div>

                  <div className="section">

                    <div id="left4enter">
                      <div class="wimg" align="right"></div>
                    </div>
                    
                    <div id="right4enter">
                      <br></br>
                      <p class="b2">
                        <b>遺產分配機制</b>
                      </p>
                      <p class="o2">讓您的加密貨幣如鑽石價值永流傳</p>
                      <br></br>
                      <p class="bl2">
                        只需要您所要分配之受益人的電子郵件與身分證字號<br></br>
                        我們將提供您一份可以隨時修改的遺產分配合約。<br></br>
                        <p></p>
                        不論是繼承人或分配額度，都能如您所願<br></br>
                        保障您的加密貨幣價值可以永久傳承。
                      </p>
                      <br></br>
                      <div class="backup2">
                        <Button href="/Main" variant="btn btn-dark">
                          建立我的遺囑合約/取得我的繼承資產
                        </Button>
                      </div>
                    </div>
                    
                  </div>
                  <div className="section">
                    <p class="big a">
                      透過以上兩種功能 <br></br>保護自己的虛擬資產，達成虛擬資產的延續
                    </p>
                    <div class="a5">
                      <div id="left5enter">
                        <p>建立救援/遺囑合約</p>
                        <Button
                          class="button"
                          href="/Main"
                          variant="outline-warning"
                        >
                          建立合約
                        </Button>
                      </div>
                      <div id="right5enter">
                        <p>
                          啟用救援/遺囑合約
                        </p>
                        <Button href="/ActivateMain" variant="outline-warning">
                          啟用合約
                        </Button>
                      </div>
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              );
            }}
          />
        </div>
      </Layout>
    );
  }

}
export default EnterPage;

{
  /* <Nav.Link href="/Backup">Create</Nav.Link> */
}
{
  /* <Nav.Link href="/ActivateBackup">Activate</Nav.Link>
<Nav.Link href="/TestaManage">Testamentary</Nav.Link>
 <Col md={{ span: 12 }}><h5><b>salVAger</b></h5></Col>
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
                                          
                                </div> */
}
