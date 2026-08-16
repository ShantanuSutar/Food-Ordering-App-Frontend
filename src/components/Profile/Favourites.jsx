import React from 'react'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const Favourites = () => {
  const {auth} = useSelector(store => store)

  return (
    <div>
      <h2 className=' py-5 text-xl font-semibold text-center'>My favourites</h2>
      <div className=' flex flex-wrap gap-3 justify-center'>
        {auth?.favourites?.map((item) => <RestaurantCard item={item}/>)}
      </div>
    </div>
  )
}

export default Favourites