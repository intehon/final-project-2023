import { Loading } from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { claimItem, deleteItem } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import moment from 'moment/moment'
import { setItems } from '../reducers/itemSlice'
import { FiShoppingCart } from "react-icons/fi"
import { FiHeart } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"

export const ItemListing = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const items = useSelector((state) => state.items.items)
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false)
    }, 2000)

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

  return (
    <>
      {/* <h2>Treasures Up for Grabs!</h2> */}
      <PageContainer>
      {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <p>No items available</p>
        ) : (
          <div>
            {reversedItems.map((item) => (
              <ItemContainer key={item.id}>
                {item.imageUrl && <Image src={item.imageUrl} alt={item.title} />}
                <div>
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
                  <Title>{item.title}</Title>
                  <Description>{item.description}</Description>
                  <Tags># {item.tags ? item.tags.join(', ') : 'No tags'}</Tags>
                  <UserDetails>
                    <p>{moment(item.createdAt).fromNow()}</p>
                    <LikeContainer>
                      <FiHeart style={{ marginRight: '5px' }} />
                      <p>x {item.likes ? item.likes.length : 0}</p>
                    </LikeContainer>
                  </UserDetails>
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
  max-width: 800px;
  margin: 0 auto;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`

const Description = styled.p`
  margin-bottom: 5px;
`

const Image = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white; 
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Tags = styled.p`
  font-style: italic;
  margin-bottom: 5px;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
`

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  align-items: flex-start;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgb(162, 162, 162)
`

const ActionButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background-color: ${({ isClicked }) => (isClicked ? '#e5989b' : 'white')};
  transition: transform 0.3s ease; 

  & > svg {
    color: black; 
  }

  &:hover {
    transform: scale(1.1); /* Scale the button on hover */
  }

  &:hover {
    background-color: ${({ isClicked }) => (isClicked ? '#e5989b' : '#e5989b')}; 
  }
`