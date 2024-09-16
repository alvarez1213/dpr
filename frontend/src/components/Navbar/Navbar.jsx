import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as ReactNavbar } from 'react-bootstrap';

import { NavItem } from '../NavItem'

export const Navbar = () => {
  const navbarItems = [
    { id: 1, name: 'Вход', link: '/signin' },
    { id: 2, name: 'Регистрация', link: '/signup' },
    { id: 3, name: 'Хранилище', link: '/storage' },
  ]

  return (
    <ReactNavbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <ReactNavbar.Brand href="/">My Cloud</ReactNavbar.Brand>
        <Nav className="md-right">
          {navbarItems.map((item) => (
            <NavItem key={item.id} name={item.name} link={item.link} />
          ))}
        </Nav>
      </Container>
    </ReactNavbar>
  )
}
