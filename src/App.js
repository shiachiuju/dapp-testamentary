//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//includes
import './App.css';
//components
import MainPage from './pages/mainpage';
import BackupCreatePage from './pages/backupcreatepage';
import ActivateBackupPage from './pages/activatebackuppage';
import TestaManagePage from './pages/testamanagepage';
import JoinPage from './pages/joinpage';
import Mail from './sendmail';
import ActivateTestamentPage from './pages/activatetestament';
import ConductTestaPage from './pages/conducttestapage';

//Run
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={JoinPage} />
          <Route exact path="/Main" component={MainPage} />
          <Route exact path="/Backup" component={BackupCreatePage}/>
          <Route exact path="/ActivateBackup" component={ActivateBackupPage}/>
          <Route exact path="/TestaManage" component={TestaManagePage}/>
          <Route exact path="/ActivateTestament" component={ActivateTestamentPage}/>
          <Route exact path="/mail" component={Mail}/>
          <Route exact path="/ConductTestament" component={ConductTestaPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
