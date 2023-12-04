import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/itemSlice'
import { cloudinary } from '../utils/cloudinaryConfig'

export const AddItem = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const handleAddItem = async () => {
    try {
      if (!title || !description || !image) {
        // Handle case where required fields are missing
        return
      }

      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'k9v6qoib') // Replace with your Cloudinary upload preset

      // Upload image to Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/dabppspye/image/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const imageUrl = data.secure_url

        // Dispatch action to add item with image URL
        dispatch(addItem({ title, description, imageUrl }))

        // Clear input fields after adding item
        setTitle('')
        setDescription('')
        setImage(null)
      } else {
        // Handle error response from Cloudinary
        console.error('Failed to upload image to Cloudinary')
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div>
      <h2>Add Item</h2>
      <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
      <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleAddItem}>Add</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}