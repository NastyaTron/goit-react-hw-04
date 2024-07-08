export default function ImageCard({
  item: {
    urls: { small, regular },
    description,
  },
  openModal,
}) {
  return (
    <div>
      <img
        src={small}
        alt={description}
        onClick={() => openModal({ regular, description })}
      />
    </div>
  );
}
