import { NavBar } from './Navbar'
import styled from '@emotion/styled'

const HeaderContainer = styled.header`
  width: 500px;
  margin: 0 auto;
  /* padding: 0 20px;  */
  
  @media (max-width: 767px) {
    max-width: 100%; 
  }
`

export const Header = () => {
  return (
    <HeaderContainer>
      <NavBar />
    </HeaderContainer>
  )
}