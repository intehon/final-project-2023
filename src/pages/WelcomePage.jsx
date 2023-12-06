import { Signup } from './Signup'
import styled from '@emotion/styled'

const PageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
`

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


export const WelcomePage = () => {
  return (
    <PageContainer>
      <div>
        <WelcomeHeader>Welcome to Swapify</WelcomeHeader>
        <WelcomeParagraph>
          Join our vibrant sharing hub! Here, you can list treasures you're eager to share or donate and explore a treasure trove of items offered by your local community.
        </WelcomeParagraph>
        <WelcomeParagraph>
          Together, let's unlock the power of sharing for Agenda 2030 goals - sharing resources, boosting sustainable living, and nurturing thriving communities! Remember, folks, sharing is caring!
        </WelcomeParagraph>
        <div>
          <WelcomeSubHeader>Signup</WelcomeSubHeader>
          <Signup />
        </div>
      </div>
    </PageContainer>
  )
}