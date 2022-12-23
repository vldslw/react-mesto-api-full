import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from 'react-router-dom'; 

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({password, email})
  } 

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <>
      <Header 
        linkText="Войти"
        linkUrl="/sign-in"
        isSignOut={false}
      />
      <main className="content">
        <form
          className="sign__form"
          onSubmit={handleSubmit}
        >
          <h2 className="sign__title">Регистрация</h2>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="sign__input sign__input_type_email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="profile-name-error" className="sign__error"></span>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="sign__input sign__input_type_password"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="profile-about-error" className="sign__error"></span>
          <button type="submit" className="sign__submit-button">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Register;