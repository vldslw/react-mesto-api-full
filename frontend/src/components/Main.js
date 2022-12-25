import {useEffect, useState} from 'react';
import api from "../utils/Api";
import editImg from "../images/edit-img.svg";
import addImg from "../images/add-img.svg";
import Card from "./Card";
import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, email }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  function signOut(){
    localStorage.removeItem('jwt');
  }

  return (
    <>
    <Header 
      linkText="Выйти"
      linkUrl="/sign-in"
      onClick={signOut}
      isSignOut={true}
      children={
        <p className='header__email'>{email}</p>
      }
    />
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button
            className="profile__edit"
            type="button"
            onClick={onEditProfile}
          >
            <img
              className="profile__edit-img"
              src={editImg}
              alt="Кнопка редактирования"
            />
          </button>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}>
          <img
            className="profile__add-img"
            src={addImg}
            alt="Кнопка добавления"
          />
        </button>
      </section>
      <section className="elements" aria-label="Секция с фотографиями">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            link={item.link}
            name={item.name}
            likes={item.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Main;
