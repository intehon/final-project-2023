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

const WelcomeParagraph = styled.p`
  margin-bottom: 15px;
`

const WelcomeSubHeader = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`