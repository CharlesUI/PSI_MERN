import React, { useEffect, useState } from 'react'
import { API_URL } from '../hooks/config'
import { useAuthContext } from '../hooks/useAuthContext'

export default function INVENTORY() {
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData= async () =>{
      const response = await fetch(`${API_URL}/drugs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${user && user.token}`
        }
      })

      const json = await response.json()


      console.log(json)
    }

    if(user) {
      fetchData()
    }
    

  }, [])

  return (
    <div>INVENTORY</div>
  )
}
