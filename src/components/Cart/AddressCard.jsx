import { Button, Card, Chip, Radio } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { formatAddress, isAddressComplete } from '../util/address'

const AddressCard = ({ item, selected = false, checkoutDisabled = false, onSelect, onDeliver, onEdit, onDelete }) => {
  const complete = isAddressComplete(item)
  const selectable = typeof onSelect === 'function'
  const manageable = typeof onDelete === 'function'

  return (
    <Card
      onClick={() => onSelect?.(item)}
      className={`flex min-h-56 w-full gap-4 rounded-xl border p-5 transition-all duration-200 ${selectable ? 'cursor-pointer' : ''} ${
        selected
          ? 'border-orange-500 bg-orange-500/10 shadow-[0_12px_30px_rgba(249,115,22,0.1)]'
          : 'border-slate-400/15 hover:-translate-y-0.5 hover:border-orange-400/55'
      }`}
    >
      <HomeOutlinedIcon color={selected ? 'primary' : 'inherit'} />
      <div className='flex min-w-0 flex-1 flex-col gap-3 text-gray-400'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='truncate text-lg font-semibold text-white'>{item.fullName || 'Delivery address'}</h2>
          {selectable && (
            <Radio
              checked={selected}
              onChange={() => onSelect?.(item)}
              onClick={(event) => event.stopPropagation()}
              inputProps={{ 'aria-label': `Select ${item.fullName || 'delivery address'}` }}
              size='small'
              color='primary'
            />
          )}
          {selected && <Chip label='Selected' color='primary' size='small' />}
        </div>
        <p className='flex-1 text-sm leading-6'>{formatAddress(item) || 'Address details unavailable'}</p>
        {!complete && <p className='text-xs text-red-400'>This saved address is incomplete.</p>}
        {manageable ? (
          <div className='flex gap-2'>
            <Button
              variant='outlined'
              fullWidth
              onClick={(event) => {
                event.stopPropagation()
                onEdit?.(item)
              }}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              color='error'
              fullWidth
              onClick={(event) => {
                event.stopPropagation()
                onDelete(item)
              }}
            >
              Delete
            </Button>
          </div>
        ) : (onDeliver || onEdit) && (
          <Button
            variant={selected ? 'contained' : 'outlined'}
            fullWidth
            disabled={checkoutDisabled}
            onClick={(event) => {
              event.stopPropagation()
              onSelect?.(item)
              if (complete) onDeliver?.(item)
              else onEdit?.(item)
            }}
          >
            {complete ? 'Deliver here' : 'Complete address'}
          </Button>
        )}
      </div>
    </Card>
  )
}

export default AddressCard
