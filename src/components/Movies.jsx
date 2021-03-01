import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';

import _ from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'all genres' }, ...data];
    this.setState({ movies, genres });
  }

  handleDeleteMovie = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    // delete server
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This Movie Already been deleted');
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };

    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      sortColumn,
      pageSize,
      movies: allMovies,
      searchQuery,
      selectedGenre,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((f) => f.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  render() {
    const { length: count } = this.state.movies;

    const { currentPage, sortColumn, pageSize } = this.state;
    if (count === 0) return <p>There is no Movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    const { user } = this.props;

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link
              to='/movies/new'
              className='btn btn-primary'
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} data Movies on table</p>
          <input
            type='text'
            name='query'
            className='form-control my-3'
            placeholder='Search...'
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDeleteMovie}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
