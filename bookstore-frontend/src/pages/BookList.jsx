import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Star, Filter } from 'lucide-react'
import api from '../api/api'   // changed

const BookList = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres()
    fetchBooks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedGenre])

  const fetchGenres = async () => {
    try {
      const response = await api.get(`/api/books/genres`)   // changed
      setGenres(response.data)
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/api/books`)   // changed
      setBooks(response.data || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    fetchBooks()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Browse Books
        </h1>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="input-field"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No books found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books
                .filter((b) =>
                  selectedGenre ? b.genre === selectedGenre : true
                )
                .filter((b) =>
                  searchQuery
                    ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.author.toLowerCase().includes(searchQuery.toLowerCase())
                    : true
                )
                .map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/books/${book.id}`}>
                      <div className="card hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                        <img
                          src={
                            book.imageUrl ||
                            'https://via.placeholder.com/300x400'
                          }
                          alt={book.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                          {book.author}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {book.averageRating
                                ? book.averageRating.toFixed(1)
                                : '0.0'}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary-600">
                            ${book.price?.toFixed(2)}
                          </span>
                        </div>
                        {book.stock > 0 ? (
                          <span className="text-sm text-green-600 mt-2">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-sm text-red-600 mt-2">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default BookList
