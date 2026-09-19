import { useSelector } from 'react-redux'
import { RestaurantCard } from '../Restaurant/RestaurantCard'

const EMPTY_FAVOURITES = []

const Favourites = () => {
  const favourites = useSelector((store) => store.auth.favourites ?? EMPTY_FAVOURITES)

  return (
    <section className='space-y-6'>
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>My favourites</h1>
      </header>

      {favourites.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/15 p-8 text-center text-gray-400'>
          Your favourite restaurants will appear here.
        </div>
      ) : (
        <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {favourites.map((item) => <RestaurantCard key={item.id} item={item} />)}
        </div>
      )}
    </section>
  )
}

export default Favourites
