import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Loading } from './Loading'

export const AddItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

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
      setLoading(true) //Set loading to true when adding an item
      if (!title || !description) {
        setError('Please fill in all required fields')
        return
      }

      let imageUrl = null
      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'k9v6qoib')

        const response = await fetch('https://api.cloudinary.com/v1_1/dabppspye/image/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          imageUrl = data.secure_url
        } else {
          console.error('Failed to upload image to Cloudinary')
          setError('Error uploading image. Please try again.')
          return
        }
      }

      // Dispatch action to add item with image URL
      dispatch(addItem({ title, description, imageUrl }))

      // Clear input fields after adding item
      setTitle('')
      setDescription('')
      setImage(null)
      setError(null)
      //Redirect to Home component after successful post
      navigate('/home')
    } catch (error) {
      console.error('Error adding item:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false) //Set loading to false regardless of fail or success
    }
  }

  return (
    <>
      <FormContainer>
        <h2>Add Item</h2>
        <TitleInput
          type="text"
          id='title'
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <DescriptionTextarea
          placeholder="Description"
          id='description'
          value={description}
          onChange={handleDescriptionChange}
        />
        <FileInput
          type="file"
          id='image'
          accept="image/*"
          onChange={handleImageChange}
        />
        <AddButton onClick={handleAddItem}>Add</AddButton>
        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 500px; 
  }
`

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 12px; /* Adjust padding for better touch interaction */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const DescriptionTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 12px; /* Adjust padding for better touch interaction */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const FileInput = styled.input`
  margin-bottom: 10px;
`

const AddButton = styled.button`
  background-color: var(--button-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color); 
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-style: italic;
  margin-top: 5px;
  font-size: 12px;
`