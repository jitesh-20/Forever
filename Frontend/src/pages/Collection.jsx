import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProduct, setfilterProduct] = useState([])
  const [category, setcategory] = useState([])
  const [SubCategory, setsubCategory] = useState([])
  const [sortType, setsortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setcategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setsubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setsubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (SubCategory.length > 0) {
      productsCopy = productsCopy.filter(item => SubCategory.includes(item.SubCategory))
    }
    setfilterProduct(productsCopy)
  }

  useEffect(() => {
    applyFilter()
  }, [category, SubCategory, search, showSearch, products])

  const sortProduct = () => {
    let fpCopy = filterProduct.slice()
    switch (sortType) {
      case 'low-high':
        setfilterProduct(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setfilterProduct(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Dropdown Icon" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Men'} onChange={toggleCategory} /> MEN
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Women'} onChange={toggleCategory} /> WOMEN
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Kids'} onChange={toggleCategory} /> KIDS
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        {/* <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> BOTTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> WINTERWEAR
            </p>
          </div>
        </div> */}
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4`'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* Product Sort based on price */}
          <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-4'>
          {
            filterProduct.map((item, index) => (
              <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection