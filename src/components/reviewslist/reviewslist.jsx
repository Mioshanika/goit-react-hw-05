import s from './reviewslist.module.css';
import { MdOutlineReadMore } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function ReviewsList({ hits }) {
  return (
    <>
      <ul className={s.reviews_list}>
        {hits.map(item => (
          <li key={item.id}>
            <p>By&nbsp;{item.author}</p>
            <p className={s.last_updated}>
              Last updated on:&nbsp;{new Date(`${item.updated_at}`).toLocaleDateString()}
            </p>
            <p className={s.review}>
              {item.content.slice(0, 200) + '...'}&nbsp;
              <Link to={item.url} target={'_blank'}>
                <MdOutlineReadMore size={20} />
              </Link>
            </p>
          </li>
        ))}
      </ul>
      {hits.length === 0 && <p>There is no info yet</p>}
    </>
  );
}
