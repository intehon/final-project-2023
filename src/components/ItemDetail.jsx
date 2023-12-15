import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectItemById } from '../reducers/itemSlice'
import styled from '@emotion/styled'

export const ItemDetail = () => {
        const { itemId } = useParams()
        const item = useSelector(state => selectItemById(state, itemId))
  
    return (
        <PageContainer>
            <ItemContainer>
            {item.imageUrl && (
                <ImageContainer>
                <Image src={item.imageUrl} alt={item.title} />
                </ImageContainer>
            )}
            <DescriptionContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
            </DescriptionContainer>
            </ItemContainer>
        </PageContainer>
        )
}

const PageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`

const ItemContainer = styled.div`
  width: 40%; 
  margin-bottom: 20px;
  border: 1px solid #ADC2D3;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%; 
    padding: 15px; 
  }
`

const DescriptionContainer = styled.div`
  width: 100%; 
  margin-top: 15px;
  text-align: center; 
`

const Title = styled.h2` 
  font-weight: bold;
  margin-bottom: 15px; 
  color: #333; 
`

const Description = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`

const ImageContainer = styled.div`
  width: 100%; 
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-width: 400px; 
`