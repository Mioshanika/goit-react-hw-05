import s from './about.module.css';
import { FaReact } from 'react-icons/fa';
import { TbBrandVite } from 'react-icons/tb';

export default function About() {
  return (
    <div className="page">
      <h2>About</h2>
      <p>
        React Movie Browser is the GoIT study project made with <FaReact /> React javascript
        framework, bundler <TbBrandVite /> Vite and
      </p>
      <a href="https://www.themoviedb.org/" target="_blank">
        <img src="/tmdb-logo.png" alt="The Movie Database logo" width="280" />
      </a>
      <p>
        App uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by
        TMDB.
      </p>
    </div>
  );
}
