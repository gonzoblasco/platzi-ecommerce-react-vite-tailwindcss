import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context/index.jsx'
import { ShoppingBagIcon } from '@heroicons/react/24/solid/index.js'

const Navbar = () => {
  const {
    cartProducts,
    closeCheckoutSideMenu,
    openCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    setSearchByCategory,
  } = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  return (
    <nav
      className="flex justify-between items-center fixed z-10 w-full py-5 px-8
      text-sm font-light top-0 bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={'/'}>Shopi</NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory()}
            to={'/'}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory('clothes')}
            to={'/clothes'}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory('electronics')}
            to={'/electronics'}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory('furnitures')}
            to={'/furnitures'}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory('toys')}
            to={'/toys'}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            onClick={() => setSearchByCategory('others')}
            to={'/others'}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">gonzoblasco@icloud.com</li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            to={'/my-orders'}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            to={'/my-account'}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? activeStyle : undefined}
            to={'/sign-in'}
          >
            Sign In
          </NavLink>
        </li>
        <li className='flex items-center'>
          <ShoppingBagIcon
            className="h-6 w-6"
            onClick={!isCheckoutSideMenuOpen ? openCheckoutSideMenu : closeCheckoutSideMenu}/>
          <div>{cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar