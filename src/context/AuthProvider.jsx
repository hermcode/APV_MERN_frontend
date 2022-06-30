import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const userAuthentication = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axiosClient.get('/veterinarians/profile', config)
        setAuth(data)
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({})
      }
      setLoading(false)
    }

    userAuthentication()
  }, [])

  const signOut = () => {
    localStorage.removeItem('token')
    setAuth({})
  }

  const updateProfileData = async (profileData) => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = `/veterinarians/profile/${profileData._id}`
      const { data } = await axiosClient.put(url, profileData, config)

      return {
        msg: 'Cambios guardados correctamente',
        error: false
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  const savePassword = async (passData) => {

    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = '/veterinarians/update-password'
      const { data } = await axiosClient.put(url, passData, config)

      return {
        msg: data.msg,
        error: false
      }

    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        signOut,
        updateProfileData,
        savePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext