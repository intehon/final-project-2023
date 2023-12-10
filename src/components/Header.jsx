import { NavBar } from './Navbar'
import styled from '@emotion/styled'
import logo from '../assets/logo_transparent.png'

export const Header = () => {
  return (
    <HeaderContainer>
      <NavBar />
      <LogoContainer>
        <img src={logo} alt="ShareShelf logo" />
      </LogoContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 500px;
  margin: 0 auto;
  
  @media (max-width: 767px) {
    max-width: 100%; 
  }
`

const LogoContainer = styled.div`
  margin: 0 auto;
  max-width: 180px; 
  padding: 10px;
  
  img {
    width: 100%; 
    height: auto; 
    display: block;
    margin: 0 auto; 
  }
`
