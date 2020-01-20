import React, { Component } from 'react';
import './App.css';
import RepoTable from './components/Repos';
import AppBarMenu from './components/AppBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      date: new Date().toLocaleString()
    };
  }
  render() {
    return (
      <div className="body">
        <div>
          {/* <AppBarMenu fun1={this.printInput}/> */}
            <br />
          <div className="addPadding">
              <RepoTable />
                <br /> <br />  <br /> <br />
          </div>
        </div>
       <footer className="footer">
            <p className="Date-div">{this.state.date}</p>
            <p></p>
       </footer>
      </div>
    );
  }
}
export default App;