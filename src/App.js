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
import Mail from './sendmail';

//Run
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Backup" component={BackupCreatePage}/>
          <Route exact path="/ActivateBackup" component={ActivateBackupPage}/>
          <Route exact path="/TestaManage" component={TestaManagePage}/>
          <Route exact path="/mail" component={Mail}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
