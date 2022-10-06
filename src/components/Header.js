import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

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
