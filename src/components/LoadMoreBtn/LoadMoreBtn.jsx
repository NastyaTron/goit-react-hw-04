import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ page, setPage }) {
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.container}>
      <button className={css.button} onClick={handleLoadMore} type="submit">
        Load More
      </button>
    </div>
  );
}
