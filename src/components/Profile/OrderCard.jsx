import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Avatar, AvatarGroup, Button, Card, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const statusLabel = (status = '') => status.replaceAll('_', ' ').toLowerCase()

const statusColor = (status) => {
  if (status === 'DELIVERED' || status === 'COMPLETED' || status === 'PAID') return 'success'
  if (status === 'CANCELLED' || status === 'PAYMENT_CANCELLED' || status === 'PAYMENT_FAILED') return 'error'
  if (status === 'READY' || status === 'OUT_FOR_DELIVERY') return 'info'
  return 'warning'
}

const formatDate = (value) => {
  if (!value) return 'Date unavailable'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

const OrderCard = ({ order, onCancel, cancelling }) => {
  const navigate = useNavigate()
  const items = order.items || []
  const canCancel = order.orderStatus === 'PENDING' && order.paymentStatus !== 'PAID'

  return (
    <Card className='min-w-0 rounded-xl p-4 transition-colors hover:border-orange-500/30 sm:p-5'>
      <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex min-w-0 gap-4'>
          <AvatarGroup max={3} sx={{ alignSelf: 'flex-start', '& .MuiAvatar-root': { width: 48, height: 48 } }}>
            {items.map((item) => (
              <Avatar
                key={item.id ?? `${order.id}-${item.food?.id}-${item.itemName}`}
                src={item.food?.images?.[0]}
                alt={item.itemName || item.food?.name || 'Ordered item'}
              />
            ))}
          </AvatarGroup>
          <div className='min-w-0 space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='!m-0 !text-lg !font-semibold'>Order #{order.id}</h2>
              <Chip size='small' color={statusColor(order.orderStatus)} label={statusLabel(order.orderStatus)} />
              <Chip
                size='small'
                variant='outlined'
                color={statusColor(order.paymentStatus)}
                label={statusLabel(order.paymentStatus || 'PENDING_PAYMENT')}
              />
            </div>
            <p className='truncate text-sm text-gray-300'>{order.restaurant?.name || 'Restaurant unavailable'}</p>
            <p className='text-sm text-gray-500'>{formatDate(order.createdAt)}</p>
            <p className='line-clamp-2 text-sm text-gray-400'>
              {items.map((item) => `${item.quantity}× ${item.itemName || item.food?.name || 'Archived item'}`).join(', ')}
            </p>
            <p className='font-semibold text-white'>₹{order.totalPrice ?? order.totalAmount ?? 0}</p>
          </div>
        </div>

        <div className='flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch'>
          <Button
            variant='outlined'
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/my-profile/orders/${order.id}`)}
          >
            Details
          </Button>
          {canCancel && (
            <Button color='error' disabled={cancelling} onClick={() => onCancel(order)}>
              Cancel order
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default OrderCard
