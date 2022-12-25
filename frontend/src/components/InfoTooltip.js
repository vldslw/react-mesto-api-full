

function InfoTooltip({ isOpen, onClose, name, data }) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={data.image} className="popup__info-tooltip-img"></img>
        <h2 className="popup__info-tooltip-text">{data.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;