import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchResults: false,
      artistSearch: '',
      artistSearched: '',
      albumsResult: [],
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  btnSearchAlbums = async () => {
    const { artistSearch } = this.state;
    this.setState({ loading: true, artistSearch: '', searchResults: false },
      async () => {
        const albums = await searchAlbumsAPI(artistSearch);
        console.log(albums);
        this.setState({
          loading: false,
          albumsResult: [...albums],
          searchResults: true,
          artistSearched: artistSearch,
        });
      });
  }

  renderAlbums = () => {
    const { artistSearched, albumsResult } = this.state;
    if (albumsResult.length === 0) {
      return <h1>No albums were found</h1>;
    } return (
      <section>
        <h1>
          { `Resultado de álbuns de: ${artistSearched}` }
        </h1>
        {albumsResult.map((album) => {
          const {
            artistName,
            collectionId,
            artworkUrl100,
            collectionName,
          } = album;
          return (
            <div key={ collectionId }>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{ artistName }</p>
              <p>
                <Link
                  to={ `/album/${collectionId}` }
                >
                  { collectionName }
                </Link>
              </p>
            </div>
          );
        }) }
      </section>
    );
  };

  render() {
    const {
      loading,
      artistSearch,
      searchResults,
      albumsResult,
    } = this.state;
    return (
      <main>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Search
              { ...props }
              handlechange={ this.handleChange }
              value={ artistSearch }
              btnSearchAlbums={ this.btnSearchAlbums }
              searchResults={ searchResults }
              albumsResult={ albumsResult }
              loading={ loading }
              renderAlbums={ this.renderAlbums }
            />) }
        />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
