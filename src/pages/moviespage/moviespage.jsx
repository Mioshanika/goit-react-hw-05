import s from './moviespage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchBar from '../../components/searchbar/searchbar';
import MovieList from '../../components/movielist/movielist';
import { getMoviesByName } from '../../services/tmdb-api';
import Loader from '../../components/loader/loader';

export default function MoviesPage() {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const query = queryParams.get('query') ?? '';

  const handleSearch = query => {
    if (!query) {
      toast.error('Query required');
      queryParams.delete('query');
      return setQueryParams(queryParams);
    }
    queryParams.set('query', query);
    setQueryParams(queryParams);
  };

  useEffect(() => {
    const cancelQuery = new AbortController();
    const requestAPI = async () => {
      try {
        setIsLoading(true);
        const apiData = await getMoviesByName(query, cancelQuery.signal);
        setHits(apiData.results);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          toast.error('Request error occured');
        }
      } finally {
        setIsLoading(false);
      }
    };
    requestAPI();
    return () => {
      cancelQuery.abort();
    };
  }, [query]);

  return (
    <div className="page">
      <h2>Search the movie by name</h2>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {!isLoading && <MovieList hits={hits} />}
    </div>
  );
}
