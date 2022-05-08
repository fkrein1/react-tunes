import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics, changeFavorite, isFavorite } = this.props;
    return (
      musics.map((music) => (
        <div key={ music.trackId }>
          <p>{ music.trackName }</p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ music.trackId }>
            Favorita
            <input
              type="checkbox"
              id={ music.trackId }
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ () => changeFavorite(music, music.trackId) }
              checked={ isFavorite(music.trackId) }
            />
          </label>
        </div>
      )));
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf.isRequired,
  isFavorite: PropTypes.func.isRequired,
  changeFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
