import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import ReviewSection from '../components/ReviewSection'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

  useEffect(() => {
    fetchBook()
  }, [id])

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/books/${id}`)
      setBook(response.data)
    } catch (error) {
      console.error('Error fetching book:', error)
      toast.error('Failed to load book details')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }
    if (book.stock < quantity) {
      toast.error('Insufficient stock')
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(book)
    }
    toast.success('Added to cart!')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">Book not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={book.imageUrl || 'https://via.placeholder.com/500x700'}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {book.title}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">{book.author}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
                </span>
                <span className="text-gray-500">({book.totalReviews || 0} reviews)</span>
              </div>
              <span className="text-3xl font-bold text-primary-600">
                ${book.price?.toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <strong>Stock:</strong>{' '}
              {book.stock > 0 ? (
                <span className="text-green-600">{book.stock} available</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
          </div>

          {book.stock > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <ReviewSection bookId={id} />
    </div>
  )
}

export default BookDetails
