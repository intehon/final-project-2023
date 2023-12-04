import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ItemListing } from '../components/ItemListing'
import { Header } from '../components/Header'

export const Home = () => {
    const userId = useSelector(state => state.user.userId) //Get userID from redux
    const navigate = useNavigate()


    useEffect(() => {
     //If not signed in, return to welcome page
        if (!userId) {
          navigate('/')
        }
      }, [userId, navigate])

    return (
        <div>
            <Header />
            <ItemListing />
        </div>
    )
}