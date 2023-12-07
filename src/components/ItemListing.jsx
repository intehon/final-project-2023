import { Loading } from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { claimItem, deleteItem } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import { useState } from 'react'
import moment from 'moment/moment'

export const ItemListing = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const items = useSelector((state) => state.items.items)

  const handleClaimItem = (itemId) => {
    dispatch(claimItem(itemId))
  }

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId))
  }

  const reversedItems = [...items].reverse()
  const totalItems = items.length
  const unclaimedItems = items.filter((item) => !item.isClaimed).length

  return (
    <>
      <h2>Items available</h2>
      <PageContainer>
        {items.length === 0 ? (
          <p>No items available</p>
        ) : (
          <div>
            {reversedItems.map((item) => (
              <ItemContainer key={item.id}>
              {item.imageUrl && <Image src={item.imageUrl} alt={item.title} />}
                <ItemDetails>
                  <Title>{item.title}</Title>
                  <Description>{item.description}</Description>
                  <Tags>Tags: {item.tags ? item.tags.join(', ') : 'No tags'}</Tags>
                  <ButtonContainer>
                    {!item.isClaimed ? (
                      <Button onClick={() => handleClaimItem(item.id)}>Claim Item</Button>
                    ) : (
                      <p>Item claimed!</p>
                    )}
                    <Button onClick={() => handleDeleteItem(item.id)}>Delete Item</Button>
                  </ButtonContainer>
                  <UserDetails>
                    <DateText>{moment(item.createdAt).fromNow()}</DateText>
                  </UserDetails>
                </ItemDetails>
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
  /* padding: 20px; */
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`

const ItemDetails = styled.div`
  /* margin-left: 20px; */
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
`

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e5989b;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffb4a2;
  }
`

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 5px;

`

const DateText = styled.p`
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgb(162, 162, 162)
`