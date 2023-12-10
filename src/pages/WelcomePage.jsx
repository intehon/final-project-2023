import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

export const WelcomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  console.log("is authenticated? ", isAuthenticated)


  return (
    <div className='pageContainer'>
      <ContentContainer>
          <WelcomeParagraph>
            Your hub for community sharing and caring. Explore our virtual shelves where you can add treasures you're ready to share and claim gems from others!
          </WelcomeParagraph>
          <WelcomeParagraph>
            ShareShelf is your go-to spot for swapping and snagging books, tools, clothes, and more. Let's build a community where sharing is fun and caring is effortless!
          </WelcomeParagraph>
        <div>
          <WelcomeSubHeader>
            <Button onClick={() => navigate('/signup')}>Register</Button>
          </WelcomeSubHeader>
        </div>
      </ContentContainer>
    </div>
  )
}


const ContentContainer = styled.div`
  text-align: center;
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