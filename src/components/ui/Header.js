import React from "react";

import Logo from "../../img/logo.png";

const Header = () => {
  return (
    <header className="center">
      <img className="logo" src={Logo} alt="" />
    </header>
  );
};

export default Header;
