/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid/index.js'
import { ShoppingCartContext } from '../../Context'

const Card = ({ product }) => {
  const {
    cartProducts,
    count,
    openCheckoutSideMenu,
    openProductDetail,
    setCartProducts,
    setCount,
    setProductToShow,
  } = useContext(ShoppingCartContext)

  const addProductToCart = (event, product) => {
    event.stopPropagation()
    setCount(count + 1)
    setCartProducts([...cartProducts, product])
    openCheckoutSideMenu()
  }

  const renderIcon = () => {
    // Saber si un elemento ya existe en el carrito
    const isProductInCart = cartProducts.find((item) => item.id === product.id)

    if (isProductInCart) {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center
            bg-white w-6 h-6 rounded-full m-2 p-1">
          <CheckIcon className="h-6 w-6"/>
        </div>
      )
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center
            bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductToCart(event, product)}>
          <PlusIcon className="h-6 w-6"/>
        </div>
      )
    }
  }

  const showProductDetail = (productDetail) => {
    openProductDetail()
    setProductToShow(productDetail)
  }

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProductDetail(product)}>
      <figure className="relative mb-2 w-full h-4/5">
        <span
          className="absolute bottom-0 left-0 bg-white/75 rounded-lg text-black
            text-xs m-2 px-3 py-0.5">
          {product.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product.images[0]}
          alt={product.title}/>
        {renderIcon()}
      </figure>
      <p className="flex justify-between items-center">
        <span className="text-sm font-light">{product.title}</span>
        <span className="text-lg font-medium">${product.price}</span>
      </p>
    </div>
  )
}

export default Card