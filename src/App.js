import React, { Fragment } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  // async componentDidMount() {
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY);
  //   this.setState({
  //     loading: true,
  //   });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY}`
  //   );
  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   });
  // }

  // const { users, loading, user, repos } = this.state;
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <NavBar></NavBar>
            <div className='container'>
              <Alert></Alert>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={(props) => (
                    <Fragment>
                      <Search></Search>
                      <Users></Users>
                    </Fragment>
                  )}
                ></Route>
                <Route exact path='/about' component={About}></Route>
                <Route exact path='/user/:login' component={User}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
