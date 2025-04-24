import s from './castlist.module.css';

export default function CastList({ hits }) {
  return (
    <>
      <ul className={s.cast_list}>
        {hits.map(item => (
          <li key={item.id}>
            <img
              width={200}
              height={300}
              src={
                Boolean(item.profile_path)
                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  : '/react.svg'
              }
              alt={'Profile picture'}
            />
            <p>
              {item.name}
              <br />
              as
              <br />
              {item.character}
            </p>
          </li>
        ))}
      </ul>
      {hits.length === 0 && <p>There are no info yet</p>}
    </>
  );
}
