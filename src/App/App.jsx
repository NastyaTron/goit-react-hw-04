import { useEffect, useState } from "react";
import { fetchArticles } from "../articles-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [totalPages, setTotalPages] = useState(1000);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});

  console.log(modalImage);
  const handleSearch = async (newTopic) => {
    setArticles([]);
    setTopic(newTopic);
    setPage(1);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getArticles() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchArticles(topic, page);
        setTotalPages(data.total_pages);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, [page, topic]);

  const openModal = (image) => {
    setModalIsOpen(true);
    setModalImage(image);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage({});
  };
  return (
    <>
      {page >= totalPages && <p>This is End!</p>}
      <SearchBar onSearch={handleSearch} />
      {articles.length > 0 && (
        <ImageGallery items={articles} openModal={openModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {articles.length > 0 && !loading && (
        <LoadMoreBtn page={page} setPage={setPage} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage.regular}
        alt={modalImage.description}
      />
    </>
  );
}
