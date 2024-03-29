import { useContext } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const ShoppingCart = () => {
  const context = useContext(ShoppingCartContext)

  const openCheckoutSideMenu = () => {
    if (!context.isCheckoutSideMenuOpen) {
      context.openCheckoutSideMenu()
    } else {
      context.closeCheckoutSideMenu()
    }

    context.closeProductDetail()
  }

  return (<div className="relative flex gap-0.5 items-center"
               onClick={() => openCheckoutSideMenu()}>
    <ShoppingBagIcon
      className="h-6 w-6 fill-none stroke-black cursor-pointer"/>
    <div
      className="absolute bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white">
      {context.cartProducts.length}
    </div>
  </div>)
}

export default ShoppingCart