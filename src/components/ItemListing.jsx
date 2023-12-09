import { Loading } from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { claimItem, deleteItem, setItems } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import moment from 'moment/moment'
import { FiShoppingCart } from "react-icons/fi"
import { FiHeart } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import clam from '../assets/clam.avif'
import treasure from '../assets/treasuechest.png'
import paperPlane from '../assets/paperplane.jpg'

export const ItemListing = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const items = useSelector((state) => state.items.items)
  const userId = useSelector((state) => state.user.userId)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => clearTimeout(delay)
  }, [])

  const handleClaimItem = (itemId) => {
    dispatch(claimItem(itemId))
  }

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId))
  }

  const handleLikeItem = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId && (!item.likes || !item.likes.includes(userId))) {
        const updatedLikes = item.likes ? [...item.likes, userId] : [userId]
        return { ...item, likes: updatedLikes }
      }
      return item
    })
  
    if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
      dispatch(setItems(updatedItems))
    }
  }

  const reversedItems = [...items].reverse()

  console.log("email:", user.email)


  return (
    <>
      <PageContainer>
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <NoItemsMessage>
            <img src={paperPlane} alt="No treasures" />
            <p>Looks like this treasure chest is waiting to be filled!</p>
            <p>Why not be the first to post an item?</p>
          </NoItemsMessage>
        ) : (
          <div>
            {reversedItems.map((item) => (
             <ItemContainer key={item.id}>
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.title} />
            ) : (
              <DefaultImage src={treasure} alt="Default Image" />
            )}
             <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
               <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
               <ActionContainer>
                 <ActionButton onClick={() => handleClaimItem(item.id)} isClicked={item.isClaimed}>
                   <FiShoppingCart />
                 </ActionButton>
                 <ActionButton onClick={() => handleDeleteItem(item.id)}>
                   <RiDeleteBinLine />
                 </ActionButton>
                 <ActionButton
                   isClicked={item.likes && item.likes.includes(userId)}
                   onClick={() => handleLikeItem(item.id)}
                   disabled={item.likes && item.likes.includes(userId)}
                   isDisabled={item.likes && item.likes.includes(userId)}
                 >
                   <FiHeart />
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
               </div>
             </div>
           </ItemContainer>
            ))}
          </div>
        )}
      </PageContainer>
    </>
  )
}


const PageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ADC2D3;
  max-width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 20px;

  @media (min-width: 768px) {
    align-items: center;
  }
`

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`

const Description = styled.p`
  margin-bottom: 8px;
`

const Image = styled.div`
  width: 100%;
  height: 300px;
  border: 2px solid white;
  overflow: hidden;
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 768px) and (max-width: 900px) {
    height: 250px; 
  }

  @media (min-width: 901px) {
    height: 400px; 
  }
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
  width: 100%; 
  
  @media (min-width: 768px) {
    width: 100%; /
    padding: 10px; 
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
    width: auto; 
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

const NoItemsMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-style: italic;
  color: rgb(162, 162, 162);

  img {
    width: 200px;
    height: auto;
    display: block;
    margin: 0 auto 10px;
  }
`

const DescriptionContainer = styled.div`
  padding: 10px;
  width: 100%; 
  
  @media (min-width: 768px) {
    width: 100%; 
    padding: 10px; 
  }
`

const DefaultImage = styled.img`
  width: 100%;
  height: 300px; 
  object-fit: cover; 
`