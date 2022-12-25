function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_largepicture ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_largepicture">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <h2 className="popup__title popup__title_largepicture">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
