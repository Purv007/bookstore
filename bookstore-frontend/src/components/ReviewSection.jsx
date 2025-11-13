import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const ReviewSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [editingReview, setEditingReview] = useState(null)
  const { user } = useAuth()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

  useEffect(() => {
    fetchReviews()
  }, [bookId])

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reviews/book/${bookId}`)
      setReviews(response.data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingReview) {
        await axios.put(`${API_BASE_URL}/api/reviews/${editingReview.id}`, {
          bookId: parseInt(bookId),
          rating,
          comment,
        })
        toast.success('Review updated successfully!')
      } else {
        await axios.post(`${API_BASE_URL}/api/reviews`, {
          bookId: parseInt(bookId),
          rating,
          comment,
        })
        toast.success('Review added successfully!')
      }
      setShowForm(false)
      setEditingReview(null)
      setComment('')
      setRating(5)
      fetchReviews()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit review')
    }
  }

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    try {
      await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`)
      toast.success('Review deleted successfully!')
      fetchReviews()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete review')
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
    setRating(review.rating)
    setComment(review.comment)
    setShowForm(true)
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h2>
        {user && !showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Write a Review
          </button>
        )}
      </div>

      {showForm && user && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input-field"
              rows="4"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="btn-primary">
              {editingReview ? 'Update Review' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingReview(null)
                setComment('')
                setRating(5)
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {review.username}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
                {user && (user.id === review.userId || user.role === 'ADMIN') && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewSection
