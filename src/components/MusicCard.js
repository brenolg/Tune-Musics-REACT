import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    return (
      <div>
        <p>{song.trackName}</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento

          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  song: PropTypes.object.isRequired,
};

// pesquisar objectOf

export default MusicCard;
