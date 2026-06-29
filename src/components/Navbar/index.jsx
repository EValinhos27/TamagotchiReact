import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  width: 95%;
  justify-self: center;
  align-self: center;
  margin-top: 15px;
`

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 10px;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const NavItem = styled.li`
  width: 100%;
  list-style: none;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #ffb86b;
  padding: 12px 15px;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  font-size: 20px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;

  &:hover {
    background-color: #c8a2ff;
    color: #4a4a4a;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  }
`

export default function Navbar() {
    const cliente = JSON.parse(localStorage.getItem('cliente'))

    return (
        <Nav>
            <NavList>
                <NavItem><NavLink to="/">Home</NavLink></NavItem>
                <NavItem><NavLink to="/personagens">Personagens</NavLink></NavItem>
                <NavItem><NavLink to="/acessorios">Acessórios</NavLink></NavItem>
                <NavItem>
                    <NavLink to={cliente ? '/perfil' : '/login'}>
                        {cliente ? 'Minha conta' : 'Login'}
                    </NavLink>
                </NavItem>
                <NavItem><NavLink to="/sobre">Sobre nós</NavLink></NavItem>
            </NavList>
        </Nav>
    )
}
