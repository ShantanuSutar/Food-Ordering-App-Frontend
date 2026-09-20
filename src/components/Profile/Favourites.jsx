import { useSelector } from 'react-redux'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

const EMPTY_FAVOURITES = []

const Favourites = () => {
  const favourites = useSelector((store) => store.auth.favourites ?? EMPTY_FAVOURITES)

  return (
    <section className='space-y-6'>
      <SectionHeader eyebrow='My profile' title='My favourites' description='Keep your go-to restaurants close for faster ordering.' />

      {favourites.length === 0 ? (
        <EmptyState icon={<FavoriteBorderIcon />} title='No favourites yet' description='Tap the heart on a restaurant to save it here.' />
      ) : (
        <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {favourites.map((item) => <RestaurantCard key={item.id} item={item} />)}
        </div>
      )}
    </section>
  )
}

export default Favourites
