//dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//includes
import './App.css';
//components
import MainPage from './pages/mainpage';
import BackupCreatePage from './pages/backupcreatepage';
import ActivateBackupPage from './pages/activatebackuppage';
<<<<<<< HEAD
import TestaManagePage from './pages/testamanagepage';
import JoinPage from './pages/joinpage';
import SetTestamentPage from './pages/settestapage';
import ActivateTestamentPage from './pages/activatetestapage';
=======
import Mail from './sendmail';
>>>>>>> parent of 4a7be88 (no message)

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
          <Route exact path="/SetTestament" component={SetTestamentPage}/>
          <Route exact path="/ActivateTestament" component={ActivateTestamentPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
