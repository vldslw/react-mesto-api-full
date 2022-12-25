import { useEffect, useState } from "react";
import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      title,
      link,
    });
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen])

  return (
    <PopupWithForm
          title={"Новое место"}
          name={"newpicture"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={title ?? ''}
            onChange={handleTitleChange}
            id="new-title"
            name="title"
            className="popup__input popup__input_type_title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span id="new-title-error" className="error"></span>
          <input
            type="url"
            value={link ?? ''}
            onChange={handleLinkChange}
            id="new-link"
            name="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="new-link-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Создать
          </button>
        </PopupWithForm>
  )

}

export default AddPlacePopup;