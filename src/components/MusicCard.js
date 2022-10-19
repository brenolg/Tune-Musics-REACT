import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favSongsIdList: [],
  };

  componentDidMount() {
    this.saveFavSongs();
  }

  saveFavSongs = async () => {
    try {
      const favoriteSongs = await getFavoriteSongs();
      const favSongsIdList = favoriteSongs.map((song) => song.trackId);
      this.setState((current) => ({ ...current, favSongsIdList }));
    } catch (error) {
      console.log(error);
    }
  };

  handleChangeF = async (song, checked) => {
    console.log(checked);
    this.setState((prev) => ({
      ...prev,
      loading: true,

    }));
    if (checked) { await addSong(song); } else { removeSong(song); }

    await this.saveFavSongs();

    this.setState((prev) => ({
      ...prev,
      loading: false,

    }));
  };

  render() {
    const { song } = this.props;
    const {
      loading,
      favSongsIdList,
    } = this.state;

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
          htmlFor="favoriteCheck"
        >
          <input
            data-testid={ `checkbox-music-${song.trackId}` }
            type="checkbox"
            id={ song.trackId }
            name="favoriteCheck"
            checked={ favSongsIdList.includes(song.trackId) }
            onChange={ ({ target }) => this.handleChangeF(song, target.checked) }
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
