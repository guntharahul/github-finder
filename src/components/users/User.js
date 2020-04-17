import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    //getting login params from App.js path (/users/:login)
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading === true) return <Spinner></Spinner>;
  return (
    <Fragment>
      <Link to='/' className='btn btn-dark' style={{ borderRadius: '10px' }}>
        Back to Search
      </Link>
      Hireable:{''}
      {hireable ? (
        <i className='fas fa-checked text-success'></i>
      ) : (
        <i className='fas fa-times-circle text-danger'></i>
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '100px' }}
          ></img>
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio ? (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          ) : (
            <p>No bio for this user</p>
          )}
          <a
            href={html_url}
            className='btn btn-dark my-1'
            style={{ borderRadius: '10px' }}
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {login}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: {blog}</strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card     text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-danger'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos}></Repos>
    </Fragment>
  );
};

export default User;
