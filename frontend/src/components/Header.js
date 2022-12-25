import logo from "../images/header-logo.svg";
import { Link } from 'react-router-dom'; 

function Header({linkText, linkUrl, onClick, isSignOut, children}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <div className="header__info">
      {children}
      <Link to={linkUrl} onClick={onClick} className={`header__nav ${isSignOut ? "header__nav_signout" : ""}`}>{linkText}</Link>
      </div>
    </header>
  );
}

export default Header;
