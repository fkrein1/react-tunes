import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends React.Component {
  render() {
    const {
      handlechange,
      value,
      btnSearchAlbums,
      searchResults,
      loading,
      renderAlbums,
    } = this.props;

    return (
      <main>
        <Header />
        <div>Search</div>
        <div>
          <input
            type="text"
            name="artistSearch"
            onChange={ handlechange }
            value={ value }
          />
          <button
            type="submit"
            onClick={ btnSearchAlbums }
          >
            Pesquisar
          </button>
        </div>
        <div>
          { loading && <Loading />}
          { searchResults && renderAlbums() }
        </div>
      </main>
    );
  }
}

Search.propTypes = {
  handlechange: PropTypes.func.isRequired,
  btnSearchAlbums: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
  searchResults: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  renderAlbums: PropTypes.func.isRequired,
};

export default Search;
