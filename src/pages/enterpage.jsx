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
            <div className="App">
                
                   <div class="center">
                                <p>Welcome to GVA(Guardian of Virtual Assets)</p>
                                <p>We are here to protect your virtual assets.</p>
                                <br></br>
                                <div class="out">
                                    <p>About us:</p>
                                </div>
                                <p>As a part of virtual account user, you might consider:</p>
                                
                                <p>"What if we lose our password for virtual wallet?"</p>
                                
                                <p>"What will our virtual asset go if we die without making our testamentary?"</p>
                            </div>
                            <br></br>
                            
                            <div class="center">
                                <p>If any accident occurs,</p>
                                <p>all the virtual currency we gained will become meaningless.</p>     
                                <p>And here, we can protect your virtual currency from losing or wasting.</p>
                            </div>
                            <br></br>
                            
                            <div class="center">
                            <br></br>
                            <div id="outer">
                                <div data-azbox="" data-gjs-type="agjc-box" id="leftenter">
                                    <p><b>Create your own back-up macheniam or testamentary</b></p>
                                    <Button class="button" href="/Main" variant="outline-warning">Create your own.</Button>
                                </div>
                                <div data-azbox="" data-gjs-type="agjc-box" id="rightenter">
                                    <p><b>Activate your own back-up macheniam or testamentary</b></p>               
                                    <Button href="/ActivateMain" variant="outline-warning">Activate.</Button>
                                </div>
                            </div>                       
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
 <Col md={{ span: 12 }}><h5><b>GVA(Guardian of Virtual Assets) gives your assets GVA(Gross value added)</b></h5></Col>*/