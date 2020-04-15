import React, { Fragment } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <NavBar></NavBar>
        <div className='cotainer'>
          <Users></Users>
        </div>
      </div>
    );
  }
}

export default App;
