import { createContext, useEffect, useState } from 'react'

export const ShoppingCartContext = createContext()

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)

  }
}

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({ children }) => {
  const [account, setAccount] = useState({})
  const [cartProducts, setCartProducts] = useState([])
  const [count, setCount] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [order, setOrder] = useState([])
  const [productToShow, setProductToShow] = useState({})
  const [products, setProducts] = useState([])
  const [searchByCategory, setSearchByCategory] = useState(null)
  const [searchByTitle, setSearchByTitle] = useState(null)
  const [signOut, setSignOut] = useState(false)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products').
      then(response => response.json()).
      then(data => setProducts(data))
  }, [])

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredProducts(filterBy('BY_TITLE_AND_CATEGORY', products, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredProducts(filterBy('BY_TITLE', products, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredProducts(filterBy('BY_CATEGORY', products, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredProducts(filterBy(null, products, searchByTitle, searchByCategory))
  }, [products, searchByTitle, searchByCategory])

  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  const filterBy = (searchType, products, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredProductsByTitle(products, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredProductsByCategory(products, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredProductsByCategory(products, searchByCategory).filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return products
    }
  }

  const filteredProductsByCategory = (products, searchByCategory) => {
    return products?.filter(product => product.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filteredProductsByTitle = (products, searchByTitle) => {
    return products?.filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const openCheckoutSideMenu = () => {
    setIsProductDetailOpen(false)
    setIsCheckoutSideMenuOpen(true)
  }
  const openProductDetail = () => {
    setIsProductDetailOpen(true)
    setIsCheckoutSideMenuOpen(false)
  }

  return (
    <ShoppingCartContext.Provider value={{
      account,
      cartProducts,
      count,
      filteredProducts,
      isCheckoutSideMenuOpen,
      isProductDetailOpen,
      order,
      productToShow,
      products,
      searchByCategory,
      searchByTitle,
      setAccount,
      setCartProducts,
      setCount,
      setOrder,
      setProductToShow,
      setProducts,
      setSearchByCategory,
      setSearchByTitle,
      setSignOut,
      signOut,
      closeCheckoutSideMenu,
      closeProductDetail,
      filteredProductsByTitle,
      openCheckoutSideMenu,
      openProductDetail,
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}