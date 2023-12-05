import React from 'react'
import { Signup } from './Signup'
import { Header } from '../components/Header'

export const WelcomePage = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to Swapify</h1>
      <p>
        The platform will allow users to list items they are willing to share or donate, and browse items
        offered by others within their community. It will include features for easy item categorization, search
        functionalities, and communication channels between users for arranging exchanges or donations. By encouraging
        resource sharing, the platform seeks to contribute to Agenda 2030 goals related to sustainable consumption and
        communities' well-being.
      </p>

      <div>
        <h2>Signup</h2>
        <Signup />
      </div>
    </div>
  )
}