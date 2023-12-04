import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/itemSlice'

export const AddItem = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleAddItem = () => {
    //Log values for error handling
    console.log('Title:', title);
    console.log('Description:', description);
    // Dispatch action to add item
    dispatch(addItem({ title, description }))
    // Clear input fields after adding item
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <h2>Add Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  )
}