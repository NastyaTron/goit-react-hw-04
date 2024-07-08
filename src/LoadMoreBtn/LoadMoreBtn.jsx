export default function LoadMoreBtn({ page, setPage }) {
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <button onClick={handleLoadMore} type="submit">
      Load More
    </button>
  );
}
