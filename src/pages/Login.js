import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';

class login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
    };
  }

  handleButton = () => {
    const { name } = this.state;
    const number = 3;
    const verifyMax = name.length >= number;
    this.setState({ disabledButton: !verifyMax });
  };

  handleChange = () => ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');

    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, name, disabledButton } = this.state;
    return (

      <div data-testid="page-login">
        {loading === true ? (
          <p> Carregando...</p>

        ) : (
          <label htmlFor="login">
            <input
              data-testid="login-name-input"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handleChange() }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              name="submit"
              onClick={ this.handleClick }
              disabled={ disabledButton }
            >
              butao

            </button>
          </label>
        )}
      </div>
    );
  }
}

login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default login;
