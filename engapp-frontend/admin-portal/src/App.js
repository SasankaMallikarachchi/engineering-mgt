import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import TeamTable from './components/TeamTable';
import RepoTable from './components/Repos';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="addPadding">
          <br/>
          <br />
          <br />
          <h4><u>Repositories</u></h4>
          <RepoTable />
          <br />
          <br />  <br />
          <br />
          {/* <h4>Teams</h4>
          <TeamTable /> */}
        </div>
      </div>
    );
  }
}

export default App;
