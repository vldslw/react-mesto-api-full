import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from 'react';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  } 
  
  return (
    <PopupWithForm
          title={"Редактировать профиль"}
          name={"profile"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={name ?? ''}
            onChange={handleNameChange}
            id="profile-name"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="profile-name-error" className="error"></span>
          <input
            type="text"
            value={description ?? ''}
            onChange={handleDescriptionChange}
            id="profile-about"
            name="about"
            className="popup__input popup__input_type_about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span id="profile-about-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </PopupWithForm>
  )
}

export default EditProfilePopup;