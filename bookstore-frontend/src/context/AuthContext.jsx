import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      })
      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return { success: false, error: error.response?.data?.error || 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, userData)
      const { token, ...user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return { success: false, error: error.response?.data?.error || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  const isAdmin = () => {
    return user?.role === 'ADMIN'
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
