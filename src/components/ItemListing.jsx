import { useDispatch, useSelector } from 'react-redux'
import { claimItem, deleteItem } from '../reducers/itemSlice'
import styled from '@emotion/styled'

const ItemContainer = styled.div`
display: flex;
align-items: flex-start;
margin-bottom: 20px;
`

const ItemDetails = styled.div`
margin-left: 20px;
`

const Title = styled.p`
font-weight: bold;
margin-bottom: 5px;
`

const Description = styled.p`
margin-bottom: 5px;
`

const Image = styled.img`
max-width: 300px;
max-height: 400px;
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
  padding: 5px;
`


export const ItemListing = () => {
    const dispatch = useDispatch()
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
      <div className='contentContainer'>
        <div>
          <p>Total items: {totalItems}</p>
          <p>Still to catch: {unclaimedItems}</p>
        </div>
        <h2>Item Listing</h2>
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
                      <p>Item claimed</p>
                    )}
                    <Button onClick={() => handleDeleteItem(item.id)}>Delete Item</Button>
                  </ButtonContainer>
                </ItemDetails>
              </ItemContainer>
            ))}
          </div>
        )}
      </div>
    )
  }