import { Signup } from './Signup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

export const WelcomePage = () => {
  const email = useSelector((state) => state.user.email)
  const navigate = useNavigate()

  //Redirect to '/home' if user is already logged in
  if (email) {
    navigate('/home')
  }


  return (
    <div className='pageContainer'>
      <div>
          <WelcomeHeader>Welcome to ShareShelf! 🌟 </WelcomeHeader>
          <WelcomeParagraph>
          Your hub for community sharing and caring. Explore our virtual shelves where you can add treasures you're ready to share and claim gems from others!
          </WelcomeParagraph>
          <WelcomeParagraph>
          ShareShelf is your go-to spot for swapping and snagging books, tools, clothes, and more. Let's build a community where sharing is fun and caring is effortless!
          </WelcomeParagraph>
        <div>
          <WelcomeSubHeader>Signup</WelcomeSubHeader>
          <Signup />
        </div>
      </div>
    </div>
  )
}

const WelcomeHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`

const WelcomeParagraph = styled.p`
  margin-bottom: 15px;
`

const WelcomeSubHeader = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`