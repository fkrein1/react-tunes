import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, favoriteSongs: [] };
  }

  componentDidMount() {
    this.getFavoriteSongs();
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
    const { favoriteSongs, loading } = this.state;
    return (
      <main>
        <Header />
        { loading && <Loading /> }
        { !loading
          && (
            <div>
              <MusicCard
                musics={ favoriteSongs }
                changeFavorite={ this.changeFavorite }
                isFavorite={ this.isFavorite }
              />
            </div>
          )}
      </main>
    );
  }
}

export default Favorites;
