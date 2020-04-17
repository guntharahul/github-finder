import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET_KEY;
}

const GithubState = (props) => {
  //global state that has anything to do with github
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  //we will make an action that will get dispatched to the reducer.
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search user
  //Search Github users, getting the text feild from Search Component
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
    // setUsers(res.data.items);
    // setLoading(false);
  };

  // Get singke Github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
    //using hooks
    // setUser(res.data);
    // setLoading(false);

    // this.setState({ user: res.data, loading: false });
    // console.log(res.data);
  };

  //get user repos

  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=15&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });

    // setRepos(res.data);
    // setLoading(false);
    // this.setState({ repos: res.data, loading: false });
    // console.log(res.data);
  };

  // clear users from state
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
    // this.setState({
    //   users: [],
    //   loading: false,
    // });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //wrapping entire application with a provider
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        repos: state.repos,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
