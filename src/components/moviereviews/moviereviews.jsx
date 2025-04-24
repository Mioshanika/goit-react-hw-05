import s from './moviereviews.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getReviews } from '../../services/tmdb-api';
import Loader from '../loader/loader';
import ReviewsList from '../reviewslist/reviewslist';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cancelQuery = new AbortController();
    const requestAPI = async () => {
      try {
        setIsLoading(true);
        const apiData = await getReviews(movieId, cancelQuery.signal);
        setReviews(apiData.results);
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
      {!isLoading && <ReviewsList hits={reviews} />}
    </>
  );
}
