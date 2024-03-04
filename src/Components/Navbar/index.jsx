import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context/index.jsx'
import ShoppingCart from '../ShoppingCart/index.jsx'
import { ShoppingBagIcon } from '@heroicons/react/24/solid/index.js'

const Navbar = () => {
  const {
    cartProducts,
    closeCheckoutSideMenu,
    openCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    setSearchByCategory,
    setSignOut,
    signOut,
  } = useContext(ShoppingCartContext)

  const context = useContext(ShoppingCartContext)

  const activeStyle = 'underline underline-offset-4'

  const signOutState = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOutState)
  const isUserSignOut = signOut || parsedSignOut

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const noAccountInLocalStorage = parsedAccount ? Object.keys(
    parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(
    context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parsedAccount?.email}</li>
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
              onClick={() => handleSignOut()}
              to={'/sign-in'}
            >
              Sign Out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <NavLink
          className={({ isActive }) => isActive ? activeStyle : undefined}
          to={'/sign-in'}
          onClick={() => handleSignOut()}
        >
          Sign In
        </NavLink>
      )
    }
  }

  return (
    <nav
      className="flex justify-between items-center fixed z-10 w-full py-5 px-8
      text-sm font-light top-0 bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>Shopi</NavLink>
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
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart/>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar