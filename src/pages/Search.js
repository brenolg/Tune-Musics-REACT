import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchA: '',
      buttonDisabled: true,
      artistData: [],
      loading: false,
      responseApi: false,
      savedInput: '',
    };
  }

  handleClick = async () => {
    const { searchA } = this.state;
    this.setState({ loading: true });

    const response = await searchAlbumsAPI(searchA);
    this.setState({
      savedInput: searchA,
      searchA: '',
      artistData: response,
      loading: false,
      responseApi: true,
    });
  };

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
    const { searchA,
      buttonDisabled,
      loading, artistData,
      responseApi,
      savedInput } = this.state;

    return (

      <div data-testid="page-search">

        <Header />

        {loading === true ? (<p>Carregando</p>)
          : (
            <>
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
                onClick={ this.handleClick }
                name="button"
              >
                Buscar
              </button>
            </>
          )}
        ;

        {responseApi && artistData.length > 0 === true ? (

          artistData.map((album) => (
            <>
              <p>
                {`Resultado de álbuns de: ${album.artistName}`}

              </p>
              <li key={ album.collectionId }>
                <img alt={ album.collectionId } src={ album.artworkUrl100 } />
                <p>{album.collectionName}</p>
                <p>{album.artistName}</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                />
              </li>

            </>

          )))
          : <p>Nenhum álbum foi encontrado</p>}
        ;
      </div>
    );
  }
}

export default Search;
