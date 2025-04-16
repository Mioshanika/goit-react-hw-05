import s from './search-box.module.css';

export default function SearchBox({ filter, onChange }) {
  return (
    <div className={s.search_box}>
      <label htmlFor="searchBox">Find contacts by name</label>
      <input
        type="text"
        name="searchBox"
        id="searchBox"
        value={filter}
        onChange={e => {
          onChange(e.target.value);
        }}></input>
    </div>
  );
}
