import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchA: '',
      buttonDisabled: true,
    };
  }

  hadleButton = () => {
    const { searchA } = this.state;
    const number = 2;
    const verifyMin = searchA.length >= number;
    this.setState({ buttonDisabled: !verifyMin });
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({

      searchA: value,
    }, () => this.hadleButton());
  };

  render() {
    const { searchA, buttonDisabled } = this.state;

    return (

      <div data-testid="page-search">

        <Header />

        <input
          data-testid="search-artist-input"
          name="searchA"
          value={ searchA }
          type="text"
          placeholder="Busca Artista"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisabled }
          name="button"
        >

          Buscar
        </button>

      </div>
    );
  }
}

export default Search;
