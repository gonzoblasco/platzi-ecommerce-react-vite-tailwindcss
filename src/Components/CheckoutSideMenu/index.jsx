import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { totalPrice } from '../../utils'

import OrderCard from '../OrderCard'

import './styles.css'

const CheckoutSideMenu = () => {
  const {
    cartProducts,
    closeCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    setCartProducts,
    setOrder,
    setSearchByTitle,
  } = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const newCart = cartProducts.filter((product) => product.id !== id)
    setCartProducts(newCart)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    }

    setOrder((prevOrder) => [...prevOrder, orderToAdd])
    setCartProducts([])
    setSearchByTitle(null)
  }

  return (
    <aside
      className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu 
       flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => closeCheckoutSideMenu()}></XMarkIcon>
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {cartProducts.map(product => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
            handleDelete={handleDelete}/>
        ))}
      </div>
      <div className="px-6 py-4">
        <p className="flex justify-between">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">${totalPrice(
            cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button
            className="w-full bg-black text-white rounded-lg py-2 mt-4"
            onClick={() => handleCheckout()}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu