import React, { Fragment, useState } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

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

  //Search Github users, getting the text feild from Search Component
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);

    // this.setState({
    //   users: [],
    //   loading: false,
    // });
  };

  // Get singke Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY}`
    );

    //using hooks
    setUser(res.data);
    setLoading(false);
    // this.setState({ user: res.data, loading: false });
    // console.log(res.data);
  };

  //get user repos

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=15&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY}`
    );
    setRepos(res.data);
    setLoading(false);
    // this.setState({ repos: res.data, loading: false });
    // console.log(res.data);
  };

  //setAlert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    // this.setState({
    //   alert: { msg: msg, type: type },
    // });

    setTimeout(() => setAlert(null), 5000);
    // setTimeout(() => this.setState({ alert: null }), 5000);
  };

  // const { users, loading, user, repos } = this.state;
  return (
    <Router>
      <div className='App'>
        <NavBar></NavBar>
        <div className='container'>
          <Alert alert={alert}></Alert>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  ></Search>
                  <Users loading={loading} users={users}></Users>
                </Fragment>
              )}
            ></Route>
            <Route exact path='/about' component={About}></Route>
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  loading={loading}
                  repos={repos}
                ></User>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
