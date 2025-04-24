import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page">
      <h2>404</h2>
      <p>
        This app does not have such resourse. Please start from <Link to="/">= Home =</Link>
      </p>
    </div>
  );
}
