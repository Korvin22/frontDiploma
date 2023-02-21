import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import NavTab from "../NavTab/NavTab";
import {Link} from "react-router-dom";
function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  function openBurger() {
    setIsOpen(true);
  }

  function closeBurger() {
    setIsOpen(false);
  }
  return (
    <>
      <header className="header">
        <Link to="/"><img src={logo} className="logo" /></Link>
        <Navigation />
      </header>
      <div className="header_mobile">
        <img src={logo} className="logo" />
        <button className="header__burger" onClick={openBurger}></button>
      </div>
      <div className={`burger ${isOpen ? "burger_opened" : "burger_closed"}`}>
        <NavTab onClose={closeBurger}/>
      </div>
    </>
  );
}

export default Header;
