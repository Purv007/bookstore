import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Package, DollarSign, Book } from 'lucide-react'
import api from '../api/api'   // axios replaced with api
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [showBookForm, setShowBookForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    price: '',
    description: '',
    stock: '',
    imageUrl: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [booksRes, ordersRes, statsRes] = await Promise.all([
        api.get(`/api/books?page=0&size=100`),
        api.get(`/api/orders/all`),
        api.get(`/api/admin/stats`),
      ])

      setBooks(booksRes.data.content || [])
      setOrders(ordersRes.data || [])
      setStats(statsRes.data || {})
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleBookSubmit = async (e) => {
    e.preventDefault()
    try {
      const bookData = {
        ...bookForm,
        price: parseFloat(bookForm.price),
        stock: parseInt(bookForm.stock),
      }

      if (editingBook) {
        await api.put(`/api/books/${editingBook.id}`, bookData)
        toast.success('Book updated successfully!')
      } else {
        await api.post(`/api/books`, bookData)
        toast.success('Book created successfully!')
      }

      setShowBookForm(false)
      setEditingBook(null)

      setBookForm({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        price: '',
        description: '',
        stock: '',
        imageUrl: '',
      })

      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save book')
    }
  }

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return

    try {
      await api.delete(`/api/books/${id}`)
      toast.success('Book deleted successfully!')
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete book')
    }
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setBookForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      price: book.price.toString(),
      description: book.description || '',
      stock: book.stock.toString(),
      imageUrl: book.imageUrl || '',
    })
    setShowBookForm(true)
  }

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/api/orders/${orderId}/status?status=${status}`)
      toast.success('Order status updated!')
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update order status')
    }
  }

  const chartData = orders
    .filter((order) => order.paymentStatus === 'PAID')
    .map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      revenue: parseFloat(order.totalPrice),
    }))

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>

        <button
          onClick={() => {
            setShowBookForm(true)
            setEditingBook(null)
            setBookForm({
              title: '',
              author: '',
              genre: '',
              isbn: '',
              price: '',
              description: '',
              stock: '',
              imageUrl: '',
            })
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Book</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.totalRevenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-primary-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalOrders || 0}
              </p>
            </div>
            <Package className="w-12 h-12 text-primary-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Books</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {books.length}
              </p>
            </div>
            <Book className="w-12 h-12 text-primary-600" />
          </div>
        </motion.div>
      </div>

      {/* Book Form Modal */}
      {showBookForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={bookForm.author}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Genre
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={bookForm.genre}
                    onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    ISBN
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="input-field"
                    value={bookForm.price}
                    onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    value={bookForm.stock}
                    onChange={(e) => setBookForm({ ...bookForm, stock: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Image URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  value={bookForm.imageUrl}
                  onChange={(e) => setBookForm({ ...bookForm, imageUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  required
                  className="input-field"
                  rows="4"
                  value={bookForm.description}
                  onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">
                  {editingBook ? 'Update' : 'Create'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowBookForm(false)
                    setEditingBook(null)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Revenue Chart
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Books Management */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Books Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Title</th>
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Author</th>
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Genre</th>
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Stock</th>
                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white">{book.title}</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{book.author}</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{book.genre}</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{book.stock}</td>

                  <td className="py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Management */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Orders Management
        </h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Order #{order.id}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.username} - {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    className="input-field"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <span className="font-bold text-primary-600">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.book.title} × {item.quantity}
                    </span>

                    <span className="font-semibold">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
