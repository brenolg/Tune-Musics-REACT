import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,

  };

  handleChangeF = async ({ target }) => {
    const { name, checked } = target;
    const { song } = this.props;

    this.setState({
      loading: true,
    });

    await addSong(song);

    this.setState({
      loading: false,
      [name]: checked,
    });
  };

  render() {
    const { song } = this.props;
    const {
      loading,
    } = this.state;
    console.log(addSong(song));

    return (

      <div>
        <p>{song.trackName}</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento

          <code>audio</code>

        </audio>
        {loading && (<p>Carregando...</p>)}

        <label
          data-testid={ `checkbox-music-${song.trackId}` }
          htmlFor="favoriteCheck"
        >
          <input
            type="checkbox"
            id={ song.trackId }
            name="favoriteCheck"
            onChange={ this.handleChangeF }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.arrayOf(),
}.isRequired;

export default MusicCard;
