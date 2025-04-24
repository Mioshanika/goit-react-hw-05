import s from './moviecast.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCast } from '../../services/tmdb-api';
import Loader from '../loader/loader';
import CastList from '../castlist/castlist';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cancelQuery = new AbortController();
    const requestAPI = async () => {
      try {
        setIsLoading(true);
        const apiData = await getCast(movieId, cancelQuery.signal);
        setCast(apiData.cast);
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
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <CastList hits={cast} />}
    </>
  );
}
