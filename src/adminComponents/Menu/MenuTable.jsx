import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Button, Card, CardContent, CardHeader, Chip, CircularProgress, IconButton, Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteFoodAction, updateMenuItemsAvailability } from '../../State/Menu/Action'

export const MenuTable = ({ limit }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { menuItems, loading, error } = useSelector((store) => store.menu)
  const visibleItems = typeof limit === 'number' ? menuItems.slice(0, limit) : menuItems

  const handleDeleteFood = (food) => {
    const confirmed = window.confirm(`Remove ${food.name} from the menu? Historical orders will be preserved.`)
    if (confirmed) dispatch(deleteFoodAction({ foodId: food.id, jwt }))
  }

  if (loading && menuItems.length === 0) {
    return <div className='flex min-h-48 items-center justify-center'><CircularProgress /></div>
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader
        title={limit ? 'Menu overview' : 'Menu items'}
        action={(
          <Button startIcon={<AddIcon />} onClick={() => navigate('/admin/restaurant/add-menu')}>
            Add item
          </Button>
        )}
      />
      <CardContent className='space-y-3 !pt-0'>
        {error && <p className='rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300'>{error}</p>}
        {visibleItems.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-400/20 p-8 text-center text-gray-400'>
            No menu items yet. Add the first item to start receiving orders.
          </div>
        ) : visibleItems.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-slate-400/15 p-3'
          >
            <Avatar variant='rounded' src={item.images?.[0]} alt={item.name} sx={{ width: 56, height: 56 }} />
            <div className='min-w-0'>
              <p className='truncate font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-400'>₹{item.price}</p>
              <div className='mt-1 flex flex-wrap gap-1'>
                {(item.ingredients || []).slice(0, 3).map((ingredient) => (
                  <Chip key={ingredient.id ?? ingredient.name} size='small' label={ingredient.name} />
                ))}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <Switch
                checked={Boolean(item.available)}
                disabled={loading}
                inputProps={{ 'aria-label': `Toggle ${item.name} availability` }}
                onChange={() => dispatch(updateMenuItemsAvailability({ foodId: item.id, jwt }))}
              />
              <IconButton aria-label={`Edit ${item.name}`} onClick={() => navigate(`/admin/restaurant/menu/${item.id}/edit`)}>
                <EditIcon />
              </IconButton>
              <IconButton color='error' aria-label={`Remove ${item.name}`} onClick={() => handleDeleteFood(item)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
