import styles from "./Search.module.css";

function Search({ search, setSearch }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Digite para pesquisar..."
      />
    </div>
  );
}
export default Search;
