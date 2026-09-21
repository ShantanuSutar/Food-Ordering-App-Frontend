import { useState } from 'react'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites } from '../../State/Authentication/Action';
import { isPresentinFavourites } from '../config/logic';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { notifyError } from '../util/toast'
import { currentReturnPath } from '../Auth/authNavigation'

export const RestaurantCard = ({ item }) => {
    const [imageFailed, setImageFailed] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt")

    const {auth} = useSelector(store => store)

    const handleAddToFavourite = (event) => {
        event.stopPropagation()
        if (!jwt) {
            notifyError(null, 'Please sign in to save favourites', 'favourite-auth')
            navigate('/account/login', { state: { from: currentReturnPath(location) } })
            return
        }
        dispatch(addToFavourites({restaurantId: item?.id, jwt}))
    }
    
    const handleNavigateToRestaurant = () => {
        if(item.open){
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
        }
    }
    
  return (
    <Card className='group flex h-full w-full min-w-0 transform-gpu flex-col overflow-hidden transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-orange-500/35'>
        <div onClick={handleNavigateToRestaurant} className={`${item.open ? "cursor-pointer" : "cursor-not-allowed"} relative aspect-[16/10] overflow-hidden bg-slate-800`}>
            {item?.images?.[0] && !imageFailed ? (
              <img className='h-full w-full transform-gpu object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]' src={item.images[0]} alt={`${item.name} restaurant`} loading='lazy' decoding='async' onError={() => setImageFailed(true)} />
            ) : (
              <div className='flex h-full items-center justify-center text-slate-500'><ImageNotSupportedOutlinedIcon sx={{ fontSize: 44 }} /></div>
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent' />
            <Chip size='small' className='!absolute !left-3 !top-3' color={item?.open ? "success" : "error"} label={item?.open  ? "Open" : "Closed"} />
            <IconButton aria-label={isPresentinFavourites(auth.favourites, item) ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`} onClick={handleAddToFavourite} className='!absolute !right-3 !top-3 !bg-slate-950/70 !text-orange-400 backdrop-blur'>
              {isPresentinFavourites(auth.favourites, item) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </IconButton>
        </div>
        <button type='button' onClick={handleNavigateToRestaurant} disabled={!item.open} className='flex flex-1 flex-col p-4 text-left disabled:cursor-not-allowed'>
          <p className='truncate text-lg font-bold text-slate-50'>{item?.name}</p>
          <p className='mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400'>{item?.description || 'Fresh food prepared for delivery.'}</p>
          <div className='mt-4 flex items-center gap-1.5 text-xs text-slate-400'>
            <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <span className='truncate'>{item?.address?.city || 'Location unavailable'}</span>
          </div>
        </button>
    </Card>
  )
}
