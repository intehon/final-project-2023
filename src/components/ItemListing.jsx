import { useDispatch, useSelector } from 'react-redux'
import { claimItem } from '../reducers/itemSlice'
import { AddItem } from './AddItem'

export const ItemListing = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items) 

  const handleClaimItem = (itemId) => {
    dispatch(claimItem(itemId))
  }

  return (
    <div>
        <AddItem />
        {console.log("items: ", items)}
      <h2>Item Listing</h2>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            {!item.isClaimed ? (
              <button onClick={() => handleClaimItem(item.id)}>Claim Item</button>
            ) : (
              <p>Item claimed</p>
            )}
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}