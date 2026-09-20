import {Chip, IconButton} from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../State/Cart/Action';
const CartItem = ({item}) => {
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const handleUpdateCartItem = (value) => {
        if(value === -1 && item.quantity === 1){
            handleRemoveCartItem();
            return;
        }    

        const data = {cartItemId: item.id, quantity: item.quantity+value}
        dispatch(updateCartItem({data, jwt}))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({cartItemId: item.id, jwt: auth.jwt || jwt}))
    }
    
  return (
    <article className='p-4 sm:p-5'>
        <div className='flex min-w-0 items-center gap-4'>
            <div className='h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-800'>
                <img className='h-full w-full object-cover' src={item.food?.images?.[0]} alt={item.food?.name || 'Cart item'} />
            </div>
            <div className='flex min-w-0 flex-1 items-center justify-between gap-3'>
                <div className='min-w-0 flex-1 space-y-2'>
                    <p className='truncate font-semibold'>{item.food.name}</p>
                    <div className='flex items-center'>
                        <div className='flex items-center rounded-lg border border-slate-400/20 bg-slate-800/60'>
                            <IconButton size='small' aria-label={`Decrease ${item.food.name} quantity`} onClick={() => handleUpdateCartItem(-1)}>
                                <RemoveCircleIcon />
                            </IconButton>
                            <div className='flex h-7 min-w-7 items-center justify-center text-sm font-bold'>
                                {item.quantity}
                            </div>
                            <IconButton size='small' aria-label={`Increase ${item.food.name} quantity`} disabled={item.quantity >= 99} onClick={() => handleUpdateCartItem(1)}>
                                <AddCircleIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <p className='shrink-0 font-bold text-orange-400'>₹{item.totalPrice}</p>
            </div>
        </div>
        <div className='mt-3 flex flex-wrap gap-2 pl-24'>
            {(item.ingredients || []).map((ingredient) => <Chip key={ingredient} size='small' label={ingredient} />)}
        </div>
    </article>
  )
}

export default CartItem
