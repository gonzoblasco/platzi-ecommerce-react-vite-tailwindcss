import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'

function Home () {
  const {
    filteredProducts,
    setSearchByTitle,
  } = useContext(ShoppingCartContext)
  const renderView = () => {
    if (filteredProducts?.length > 0) {
      return filteredProducts?.map(product => (
        <Card key={product.id} product={product}/>
      ))
    } else {
      return (
        <div className="flex items-center justify-center w-full">
          No products found
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h2 className="font-medium text-xl">Exclusive Products</h2>
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={e => setSearchByTitle(e.target.value)}
        placeholder="Search a Product"
        type="text"/>
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail/>
    </Layout>
  )
}

export default Home
