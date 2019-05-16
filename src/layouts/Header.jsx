import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

const Header = () => {
  return (
    <div>
      <AppHeader>
        <img src={logo} alt="logo" />
      </AppHeader>
    </div>
  );
};

const AppHeader = styled.header``;

export default Header;
