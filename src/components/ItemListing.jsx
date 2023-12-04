import { useDispatch, useSelector } from 'react-redux'
import { claimItem, deleteItem } from '../reducers/itemSlice'
import { AddItem } from './AddItem'

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
    <div>
      <AddItem />
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
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
              {!item.isClaimed ? (
                <div>
                  <button onClick={() => handleClaimItem(item.id)}>Claim Item</button>
                </div>
              ) : (
                <p>Item claimed</p>
              )}
            <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}