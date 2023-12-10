import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import image from '../assets/SharingShelf.png'
import logo from '../assets/logo_transparent.png'

export const WelcomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated)
  const isUserAuthenticated = useSelector((state) => state.user.authenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  console.log("user auth? ", isUserAuthenticated)
  console.log("auth? ", isAuthenticated)


  return (
    <PageContainer>
      <ContentContainer>
        <FlexContainer>
          <ImageContainer>
            <img src={image} alt="Placeholder" />
          </ImageContainer>
          <TextContainer>
            <LogoContainer>
            <img src={logo} alt="ShareShelf logo" />
            </LogoContainer>
            <WelcomeParagraph>
              Your hub for community sharing and caring. Explore our virtual shelves where you can add treasures you're ready to share and claim gems from others!
            </WelcomeParagraph>
            <WelcomeParagraph>
              ShareShelf is your go-to spot for swapping and snagging books, tools, clothes, and more. Let's build a community where sharing is fun and caring is effortless!
            </WelcomeParagraph>
            <WelcomeSubHeader>
              <Button onClick={() => navigate('/signup')}>Register</Button>
            </WelcomeSubHeader>
          </TextContainer>
        </FlexContainer>
      </ContentContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const ContentContainer = styled.div`
  text-align: center;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px;
`;

const ImageContainer = styled.div`
  flex: 2;
  max-width: 25%;
  overflow: hidden; 
  border-radius: 4px; 
  img {
    width: 100%; 
    height: auto; 
    display: block;
    max-width: 100%; 
  }
`

const TextContainer = styled.div`
  flex: 1; 
  max-width: 40%; 
`

const WelcomeParagraph = styled.p`
  margin-bottom: 15px;
`

const WelcomeSubHeader = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`

const Button = styled.button`
  background-color: var(--button-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
  }
`

const LogoContainer = styled.div`
  margin: 0 auto;
  max-width: 180px; 
  padding: 10px 10px 50px 10px;
  
  img {
    width: 100%; 
    height: auto; 
    display: block;
    margin: 0 auto; 
  }
`