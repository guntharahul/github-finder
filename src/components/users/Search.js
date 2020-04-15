import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: '',
  };
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something.....', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: '',
      });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users'
            value={this.state.text}
            onChange={this.onChange}
          />
          <button
            type='submit'
            value='search'
            className='btn btn-dark btn-block'
          >
            Search
          </button>
        </form>
        {showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </Fragment>
    );
  }
}

export default Search;