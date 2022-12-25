import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import api from "../utils/Api";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import * as mestoAuth from "../utils/mestoAuth";
import ProtectedRoute from "./ProtectedRoute";
import regOk from '../images/regok.svg';
import regNotOk from '../images/regnotok.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipData, setTooltipData] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const auth = (jwt) => {
    return mestoAuth.getContent(jwt)
    .then((res) => {
      if (res) {
        const userData = res;
        setLoggedIn(true);
        setUserEmail(userData.email);
        setCurrentUser(userData);
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(`Не удалось получить данные пользователя. ${err}`);
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth(jwt);
    }
  }, []);

  const onLogin = ({password, email}) => {
    return mestoAuth.authorize(password, email)
    .then((res) => { 
      if (res.token) { 
        setLoggedIn(true); 
        localStorage.setItem('jwt', res.token);
        auth(res.token);
      } 
    })
    .catch((err) => {
      console.log(`Не удалось авторизовать пользователя. ${err}`);
      openTooltipPopup(false);
    });
  }

  const onRegister = ({password, email}) => {
    return mestoAuth.register(password, email)
    .then((res) => {
        openTooltipPopup(true);
        history.push('/sign-in') 
        return res; 
    })
    .catch((err) => {
      console.log(`Не удалось зарегистрировать пользователя. ${err}`)
      openTooltipPopup(false);
    });
  }

  const openTooltipPopup = (isSuccess) => {
    if (isSuccess) {
      setTooltipData({image: regOk, text: 'Вы успешно зарегистрировались!'});
      setInfoTooltipPopupOpen(true);
    } else {
      setTooltipData({image: regNotOk, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      setInfoTooltipPopupOpen(true);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  useEffect(() => { 
    if (loggedIn) {
      api.getInitialCards() 
      .then((res) => { 
        setCards(res); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }) 
    } 
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.updateProfileInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Не удалось обновить данные пользователя. Ошибка: ${err}`)
    });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Не удалось обновить аватар. Ошибка: ${err}`)
    });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Не удалось добавить карточку. Ошибка: ${err}`)
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Не удалось поставить лайк. Ошибка: ${err}`)
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(`Не удалось удалить карточку. Ошибка: ${err}`)
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute 
            exact path="/" 
            loggedIn={loggedIn} 
            component={Main} 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} 
            email={userEmail}
          />
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister}/>
          </Route>
        </Switch>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} name='info-tooltip' data={tooltipData} />

        <PopupWithForm
          title={"Вы уверены?"}
          name={"delete"}
          isOpen={false}
          onClose={closeAllPopups}
        >
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_type_delete"
          >
            Да
          </button>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
