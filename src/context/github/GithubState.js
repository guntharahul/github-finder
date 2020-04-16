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
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_KEY}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
    // setUsers(res.data.items);
    // setLoading(false);
  };

  //get user

  // get repos

  // clear users

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
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
