import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      AlbumMusic: [],
      albumData: {},
    };
  }

  componentDidMount() {
    this.getAlbumMusic();
  }

  getAlbumMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const songs = response.filter((song) => song.kind === 'song');
    this.setState({
      AlbumMusic: songs,
      albumData: response[0],
    });
  };

  render() {
    const { AlbumMusic, albumData } = this.state;
    return (

      <div data-testid="page-album">

        <Header />
        <h2 data-testid="artist-name">{albumData.artistName}</h2>
        <h3 data-testid="album-name">
          {`${albumData.artistName} - ${albumData.collectionName}`}

        </h3>
        <div />
        { AlbumMusic.map((song) => (
          <li key={ song.trackId }>
            <MusicCard song={ song } />
          </li>
        ))}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,

  }).isRequired,
};

export default Album;
