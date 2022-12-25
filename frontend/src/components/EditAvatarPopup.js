import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
          title={"Обновить аватар"}
          name={"avatar"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            ref={avatarRef}
            id="avatar-link"
            name="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="avatar-link-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;