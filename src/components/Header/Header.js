import React from 'react';
import './Header.scss';

const Header = () => {
  const onClickHandler = () => {
    const event = new Event('refreshAction');
    document.dispatchEvent(event);
  };

  return (
    <div className="header-container">
      <span>SEMAFOR-APP</span>
      <button onClick={onClickHandler}>Odśwież</button>
    </div>
  );
};

export default Header;
