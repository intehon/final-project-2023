import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { claimItem, deleteItem, setItems } from '../reducers/itemSlice'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import { Loading } from './Loading'
import { FiShoppingCart, FiHeart, FiInstagram } from "react-icons/fi"
import { RiTwitterXFill } from "react-icons/ri"
// import { RiDeleteBinLine } from "react-icons/ri"
import treasure from '../assets/treasuechest.png'
import paperPlane from '../assets/paperplane.jpg'
import html2canvas from 'html2canvas'

export const ItemListing = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const items = useSelector((state) => state.items.items)
  const userId = useSelector((state) => state.user.userId)
  const itemRefs = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => clearTimeout(delay)
  }, [])

  const handleClaimItem = (itemId) => {
    dispatch(claimItem(itemId))
  }

  // const handleDeleteItem = (itemId) => {
  //   dispatch(deleteItem(itemId))
  // }

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

  const handleNavigateToItemDetail = (itemId) => {
    navigate(`/items/${itemId}`)
  }

  const handleInstagramShare = async (itemId) => {
    const itemElement = itemRefs.current[itemId]
    if (!itemElement) return

    try {
      const canvas = await html2canvas(itemElement)
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `share-item-${itemId}.png`
      link.click()

      alert("Your image is downloaded! Open Instagram and upload this image to share with your friends.")
    } catch (error) {
      console.error('Error generating image: ', error)
    }
  }

  const handleXShare = (item) => {
    const text = `Check out this item: ${item.title}`
    const url = `https://share-shelf.netlify.app/items/${item.id}`
    const hashtags = 'ShareShelfSustain,2030ReuseRevolution'
  
    const xBaseUrl = 'https://x.com/intent/tweet?'
    const xParams = new URLSearchParams({ text, url, hashtags })
    const xShareUrl = `${xBaseUrl}${xParams.toString()}`
  
    window.open(xShareUrl, '_blank');
  }

  const reversedItems = [...items].reverse()


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
             <ItemContainer key={item.id} ref={el => itemRefs.current[item.id] = el}>
            {item.imageUrl ? (
              <ImageContainer>
              <Image src={item.imageUrl} alt={item.title} onClick={() => handleNavigateToItemDetail(item.id)}/>
              </ImageContainer>
            ) : (
              <DefaultImage src={treasure} alt="Default Image" />
            )}
               <ActionContainer>
                 <ActionButton onClick={() => handleClaimItem(item.id)} isClicked={item.isClaimed}>
                   <FiShoppingCart />
                 </ActionButton>
                 {/* <ActionButton onClick={() => handleDeleteItem(item.id)}>
                   <RiDeleteBinLine />
                 </ActionButton> */}
                 <ActionButton
                   isClicked={item.likes && item.likes.includes(userId)}
                   onClick={() => handleLikeItem(item.id)}
                   disabled={item.likes && item.likes.includes(userId)}
                   isDisabled={item.likes && item.likes.includes(userId)}
                 >
                   <FiHeart />
                 </ActionButton>
                 <ActionButton onClick={() => handleInstagramShare(item.id)}>
                  <FiInstagram />
                 </ActionButton>
                 <ActionButton onClick={() => handleXShare(item)}>
                  <RiTwitterXFill />
                 </ActionButton>
               </ActionContainer>
                 <DescriptionContainer>
                 <Title onClick={() => handleNavigateToItemDetail(item.id)}>{item.title}</Title>
                   <Description>{item.description}</Description>
                 </DescriptionContainer>
                 <UserDetails>
                   <p>{moment(item.createdAt).fromNow()}</p>
                   <LikeContainer>
                     <FiHeart style={{ marginRight: '5px' }} />
                     <p>x {item.likes ? item.likes.length : 0}</p>
                   </LikeContainer>
                 </UserDetails>
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
  max-width: 1200px;
  width: 150%;
  box-sizing: border-box;
  background-color: white;
  padding: 5px;
  margin-left: -25%; 
  margin-right: -25%; 

  @media (min-width: 768px) {
    align-items: center;
    width: 120%; 
    margin: 0 auto;
    max-width: 1200px; 
  }

  @media (min-width: 1200px) {
    width: 100%;
    margin: 0 auto;
  }
`
const Title = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`

const Description = styled.p`
  margin-bottom: 8px;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.div`
  width: 100%;
  height: 300px;
  display: block;
  border: 2px solid white;
  overflow: hidden;
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 768px) and (max-width: 900px) {
    height: 300px; 
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
    width: 90%;
    margin: 0 auto; 
    padding: 10px; 
    max-width: 1200px; 
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
    width: 90%; 
    margin: 0 auto; 
    max-width: 1200px; 
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
    width: 90%;
    margin: 0 auto; 
    max-width: 1200px; 
  }
`

const DefaultImage = styled.img`
  width: 100%;
  height: 300px; 
  object-fit: cover; 
`