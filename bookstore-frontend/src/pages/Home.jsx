import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../api/api'   // changed

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([])

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await api.get(`/api/books?page=0&size=6`)   // changed
        setFeaturedBooks(response.data.content || [])
      } catch (error) {
        console.error('Error fetching featured books:', error)
      }
    }
    fetchFeaturedBooks()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Welcome to BookStore
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8"
          >
            Discover your next great read
          </motion.p>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/books"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Browse Books</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Books</h2>
          <Link
            to="/books"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center space-x-2"
          >
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/books/${book.id}`}>
                <div className="card hover:shadow-xl transition-shadow cursor-pointer">
                  <img
                    src={book.imageUrl || 'https://via.placeholder.com/300x400'}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({book.totalReviews || 0})
                      </span>
                    </div>
                    <span className="text-lg font-bold text-primary-600">
                      ${book.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Wide Selection
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through thousands of books across various genres
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Star className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Quality Reviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Read reviews from verified customers before making a purchase
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <ArrowRight className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your books delivered quickly and safely to your doorstep
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
