import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { musics: [], loading: true, favoriteSongs: [] };
  }

  componentDidMount() {
    this.getFavoriteSongs();
    this.renderMusics();
  }

  renderMusics = async () => {
    this.setState({ loading: true },
      async () => {
        const { match } = this.props;
        const { id } = match.params;
        const data = await getMusics(id);
        this.setState({ musics: [...data], loading: false });
      });
  }

  getFavoriteSongs = async () => {
    this.setState({ loading: true },
      async () => {
        const data = await getFavoriteSongs();
        this.setState({ favoriteSongs: [...data], loading: false });
      });
  }

  addFavoriteSong = async (song) => {
    this.setState({ loading: true },
      async () => {
        await addSong(song);
        this.setState({ loading: false });
      });
  }

  removeFavoriteSong = async (song) => {
    this.setState({ loading: true },
      async () => {
        await removeSong(song);
        this.setState({ loading: false });
      });
  }

  isFavorite = (trackId) => {
    const { favoriteSongs } = this.state;
    if (favoriteSongs.length === 0) return false;
    return favoriteSongs
      .map((song) => song.trackId)
      .includes(trackId);
  }

  changeFavorite = (song, trackID) => {
    if (this.isFavorite(trackID)) {
      this.removeFavoriteSong(song);
      this.getFavoriteSongs();
    }
    if (!this.isFavorite(trackID)) {
      this.addFavoriteSong(song);
      this.getFavoriteSongs();
    }
  }

  render() {
    const { musics, loading } = this.state;
    return (
      <main>
        <Header />
        { loading && <Loading /> }
        { !loading
          && (
            <div>
              <h2>{ musics[0].artistName }</h2>
              <h2>{ musics[0].collectionName }</h2>
              <MusicCard
                musics={ musics.slice(1) }
                changeFavorite={ this.changeFavorite }
                isFavorite={ this.isFavorite }
              />
            </div>
          )}
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf.isRequired,
};

export default Album;
