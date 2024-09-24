import { useState, useContext } from 'react';
import { UserContext } from '../UserContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as ReactNavbar } from 'react-bootstrap';
import { Link as RouterNavLink } from 'react-router-dom'

import { ConfirmLogout } from '../ConfirmLogout';

export const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useContext(UserContext);

  const toggleLogout = () => setShowLogout(previousShow => {
    return !previousShow
  });

  return (
    <ReactNavbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <ReactNavbar.Brand href="/">My Cloud</ReactNavbar.Brand>
        {user !== null ? (
          <Nav className="md-right">
            <RouterNavLink to='/storage'>
              Хранилище
            </RouterNavLink>
            <RouterNavLink onClick={toggleLogout} >
              Выйти
            </RouterNavLink>
          </Nav>
        ) : (
          <Nav className="md-right">
            <RouterNavLink to='/signin'>
              Вход
            </RouterNavLink>
            <RouterNavLink to='/signup'>
              Регистрация
            </RouterNavLink>
          </Nav>
        )}
      </Container >

      <ConfirmLogout show={showLogout} handleClose={setShowLogout} />
    </ReactNavbar >
  )
}
