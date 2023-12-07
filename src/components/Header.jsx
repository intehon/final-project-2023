import { NavBar } from './Navbar'
import styled from '@emotion/styled'

export const Header = () => {
  return (
    <HeaderContainer>
      <NavBar />
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
