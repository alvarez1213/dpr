import { Link as RouterNavLink } from 'react-router-dom';

export const NavItem = ({ name, link }) => {
  return (
    <RouterNavLink to={link}>
      {name}
    </RouterNavLink>

  )
}
