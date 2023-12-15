import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectItemById } from '../reducers/itemSlice'
import { FiShoppingCart, FiHeart, FiInstagram } from "react-icons/fi"
import { RiTwitterXFill } from "react-icons/ri"
import styled from '@emotion/styled'
import moment from 'moment'

export const ItemDetail = () => {
        const { itemId } = useParams()
        const item = useSelector(state => selectItemById(state, itemId))
        const userId = useSelector((state) => state.user.userId)
  
    return (
        <PageContainer>
            <ItemContainer>
            {item.imageUrl && (
                <ImageContainer>
                <Image src={item.imageUrl} alt={item.title} />
                </ImageContainer>
            )}
                           <ActionContainer>
                 <ActionButton onClick={() => handleClaimItem(item.id)} isClicked={item.isClaimed}>
                   <FiShoppingCart />
                 </ActionButton>
                 <ActionButton
                   isClicked={item.likes && item.likes.includes(userId)}
                   onClick={() => handleLikeItem(item.id)}
                   disabled={item.likes && item.likes.includes(userId)}
                   isDisabled={item.likes && item.likes.includes(userId)}
                 >
                   <FiHeart />
                 </ActionButton>
                 <ActionButton onClick={() => handleInstagramShare(item.id)}>
                  <FiInstagram />
                 </ActionButton>
                 <ActionButton onClick={() => handleXShare(item)}>
                  <RiTwitterXFill />
                 </ActionButton>
               </ActionContainer>
            <DescriptionContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
            </DescriptionContainer>
            <UserDetails>
                   <p>{moment(item.createdAt).fromNow()}</p>
                   <LikeContainer>
                     <FiHeart style={{ marginRight: '5px' }} />
                     <p>x {item.likes ? item.likes.length : 0}</p>
                   </LikeContainer>
                 </UserDetails>
            </ItemContainer>
        </PageContainer>
        )
}

const PageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`

const ItemContainer = styled.div`
  width: 40%; 
  margin-bottom: 20px;
  border: 1px solid #ADC2D3;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%; 
    padding: 15px; 
  }
`

const DescriptionContainer = styled.div`
  width: 100%; 
  margin-top: 15px;
  text-align: center; 
`

const Title = styled.h2` 
  font-weight: bold;
  margin-bottom: 15px; 
  color: #333; 
`

const Description = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`

const ImageContainer = styled.div`
  width: 100%; 
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-width: 400px; 
`


const ActionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
  width: 100%; 
  
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto; 
    padding: 10px; 
    max-width: 1200px; 
  }
`

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-size: 14px;
  color: rgb(162, 162, 162);
  width: 100%;

  @media (min-width: 768px) {
    width: 90%; 
    margin: 0 auto; 
    max-width: 1200px; 
  }
`

const ActionButton = styled.button`
  width: 40px; 
  height: 40px; 
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  background-color: ${({ isClicked }) => (isClicked ? '#da627d' : 'white')};
  transition: transform 0.3s ease, background-color 0.3s ease; 

  & > svg {
    color: ${({ isClicked }) => (isClicked ? 'white' : 'black')}; 
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${({ isClicked }) => (isClicked ? '#ffa5ab' : '#f1f1f1')}; 
  }
`