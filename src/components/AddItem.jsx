import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import { NavBar } from './Navbar'
import { Navigate, useNavigate } from 'react-router-dom'

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-right: 35px;
`

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const DescriptionTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const TagsInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const FileInput = styled.input`
  margin-bottom: 10px;
`

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #b5838d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e5989b; 
  }
`

const ErrorMessage = styled.p`
  color: red;
`

export const AddItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [tags, setTags] = useState([])
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

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',')
    setTags(tagsArray)
  }

  const handleAddItem = async () => {
    try {
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
      dispatch(addItem({ title, description, imageUrl, tags }))

      // Clear input fields after adding item
      setTitle('')
      setDescription('')
      setImage(null)
      setTags([])
      setError(null)
      //Redirect to Home component after successful post
      navigate('/home')
    } catch (error) {
      console.error('Error adding item:', error)
      setError('Error adding item. Please try again.')
    }
  }

  return (
    <>
      <FormContainer>
        <h2>Add Item</h2>
        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <DescriptionTextarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TagsInput
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={handleTagsChange}
        />
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <AddButton onClick={handleAddItem}>Add</AddButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </>
  )
}