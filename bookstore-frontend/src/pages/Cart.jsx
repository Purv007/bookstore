import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start adding some books to your cart!
        </p>
        <Link to="/books" className="btn-primary">
          Browse Books
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card flex items-center space-x-4"
            >
              <img
                src={item.imageUrl || 'https://via.placeholder.com/100x150'}
                alt={item.title}
                className="w-24 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{item.author}</p>
                <p className="text-primary-600 font-semibold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-primary-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full mb-4">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="btn-secondary w-full">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
