import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import logo from '../assets/logo_transparent.png'

export const WelcomePage = () => {
  const email = useSelector((state) => state.user.email)
  const navigate = useNavigate()

  //Redirect to '/home' if user is already logged in
  if (email) {
    navigate('/home')
  }


  return (
    <div className='pageContainer'>
      <ContentContainer>
          <LogoContainer>
            <img src={logo} alt="ShareShelf logo" />
          </LogoContainer>
          <WelcomeParagraph>
            Your hub for community sharing and caring. Explore our virtual shelves where you can add treasures you're ready to share and claim gems from others!
          </WelcomeParagraph>
          <WelcomeParagraph>
            ShareShelf is your go-to spot for swapping and snagging books, tools, clothes, and more. Let's build a community where sharing is fun and caring is effortless!
          </WelcomeParagraph>
        <div>
          <WelcomeSubHeader>
            <button onClick={() => navigate('/signup')}>Register</button>
          </WelcomeSubHeader>
        </div>
      </ContentContainer>
    </div>
  )
}




const ContentContainer = styled.div`
  text-align: center;
`

const LogoContainer = styled.div`
  margin: 0 auto;
  max-width: 180px; 
  
  img {
    width: 100%; 
    height: auto; 
    display: block;
    margin: 0 auto; 
  }
`

const WelcomeParagraph = styled.p`
  margin-bottom: 15px;
`

const WelcomeSubHeader = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`