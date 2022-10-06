import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',

    };
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    const response = await getUser();

    this.setState({
      loading: false,
      name: response.name,
    });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {loading === true ? (
          <p> Carregando...</p>

        ) : (
          <p data-testid="header-user-name">{name}</p>
        )}
      </header>
    );
  }
}

export default Header;
