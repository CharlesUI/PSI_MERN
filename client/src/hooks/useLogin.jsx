import React, { useContext, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { API_URL } from './config'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (formData) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.msg)
            setIsLoading(false)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            //update the context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
