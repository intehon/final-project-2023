import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ItemListing } from '../components/ItemListing'
import { Header } from '../components/Header'

export const Home = () => {
    // const userId = useSelector(state => state.user.userId) //Get userID from redux
    const email = useSelector(state => state.user.email)
    const navigate = useNavigate()

    useEffect(() => {
     //If not signed in, return to welcome page
        if (!email) {
          navigate('/')
        }
      }, [email, navigate])

    return (
        <div>
            <Header />
            <ItemListing />
        </div>
    )
}