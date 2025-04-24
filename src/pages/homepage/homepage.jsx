import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import MovieList from '../../components/movielist/movielist';
import Loader from '../../components/loader/loader';
import { getPopular } from '../../services/tmdb-api';

export default function HomePage() {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cancelQuery = new AbortController();
    const requestAPI = async () => {
      try {
        setIsLoading(true);
        const apiData = await getPopular(cancelQuery.signal);
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
  }, []);

  return (
    <div className="page">
      <h2>Popular today</h2>
      {isLoading && <Loader />}
      {!isLoading && <MovieList hits={hits} />}
    </div>
  );
}
