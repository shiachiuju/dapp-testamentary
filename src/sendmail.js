//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//includes
import './App.css';
//components
import MainPage from './pages/mainpage';
import BackupCreatePage from './pages/backupcreatepage';
import ActivateBackupPage from './pages/activatebackuppage';
import { Email} from 'react-html-email';

//Run
class Mail extends Component {
    src="https://smtpjs.com/v3/smtp.js"
    async sendEmail(email){
        let mailaddress = email;
        // let receiver = document.getElementById('name').value;

        Email.send({
        SecureToken : "d087ae4a-9ee1-4235-9dc0-d78d2f9c2c3f",
        //Host : "smtp.gmail.com",
        //Username : "beautygang4@gmail.com",
        //Password : "863E168A69C2DF10621C640866D905E1B4ED",
        //Password : "beauty4444",
        To : mailaddress,
        //document.getElementById("demo").innerHTML = mailaddress,
        //'c890713love@gmail.com''ctchanjudy@gmail.com''yuzhenchen922@gmail.com''chiu338920@gmail.com',
        
        From : "beautygang4@gmail.com",
        Subject : "美麗幫-備援機制建立",
        Body : "<b>hey! your back-up mechanism is established.</b><p><br><b>Please don't forget your Password so that you can activate it successfully.</b>"
        //"<b>Dear</b>+ 'name' +<p><br><b>想請問您6/25日下午2點是否有空跟我們meeting</b><p><br><b>Best regards</b><br><b>美麗幫 昱臻、筑婷、可親、秋如</b>"
        }).then(
            message => alert(message)
        );
    }
    async showEmail(){ 
                    
        let mailaddress = document.getElementById('email').value;
        let receiver = document.getElementById('name').value;
        var emailArray=[];
        emailArray.push(mailaddress);
        if(document.getElementById('email').value==''){
            alert('請輸入收件人信箱');
        }else{
        //var emailRegxp = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/;
        //var emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/;
        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        //var aa = /^\w ((-\w )|(\.\w ))*\@[A-Za-z0-9] ((\.|-)[A-Za-z0-9] )*\.[A-Za-z0-9] $/
            
            //if (emailRegxp.test(document.getElementById("email").value) != true){
            if (emailRule.test(mailaddress) != true){

                let NewEmailValue=mailaddress+"輸入的電子郵件有誤，請重新輸入";
                document.getElementById("newEmail").innerHTML=NewEmailValue;

            }else{

                if(document.getElementById('name').value==''){
                    alert('請輸入收件人姓名');
                }else{
                let NewEmailValue="目前輸入的email為"+ mailaddress+"寄給"+receiver;
                document.getElementById("newEmail").innerHTML=NewEmailValue;
                
                }
            }
        }
        
        //var emailaddress = email ;
        //return mailaddress;
        //console.log(emailaddress);
        //return message => alert(emailaddress);
    }
  render() {
    return (
        <div id="mail">
            <script src="https://smtpjs.com/v3/smtp.js"></script>
            <div id="email">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    this.sendEmail(this.email.value)
                }}>
                    <input 
                    id="emailadd" 
                    ref={(input) => { 
                        this.email = input
                    }} 
                    type="text" 
                    //className="form-control" 
                    placeholder="email" 
                    required
                    />
                    <button type="submit">send</button>
                </form> 
            </div>
        </div>
        
        
    );
  }
}

export default Mail;