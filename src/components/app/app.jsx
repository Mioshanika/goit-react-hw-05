import s from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from '../navigation/navigation';

const HomePage = lazy(() => import('../../pages/homepage/homepage'));
const MoviesPage = lazy(() => import('../../pages/moviespage/moviespage'));
const MovieDetailsPage = lazy(() => import('../../pages/moviedetailspage/moviedetailspage'));
const MovieCast = lazy(() => import('../moviecast/moviecast'));
const MovieReviews = lazy(() => import('../moviereviews/moviereviews'));
const About = lazy(() => import('../../pages/about/about'));
const NotFoundPage = lazy(() => import('../../pages/notfoundpage/notfoundpage'));

export default function App() {
  return (
    <Suspense fallback={<h3>Page is loading...</h3>}>
      <div className={s.container}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}
