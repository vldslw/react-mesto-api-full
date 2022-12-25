import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({password, email})
  } 

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <>
      <Header 
        linkText="Регистрация"
        linkUrl="/sign-up"
        isSignOut={false}
      />
      <main className="content">
        <form
          className="sign__form"
          onSubmit={handleSubmit}
        >
          <h2 className="sign__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;