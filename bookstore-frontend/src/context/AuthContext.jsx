import { createContext, useState, useContext, useEffect } from 'react'
import api from '../api/api'   // axios replaced
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }

    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/login', {
        username,
        password,
      })

      const { token, ...userData } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      setUser(userData)
      toast.success('Login successful!')

      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/api/register', userData)

      const { token, ...user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      toast.success('Registration successful!')

      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    toast.success('Logged out successfully')
  }

  const isAdmin = () => {
    return user?.role === 'ADMIN'
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
