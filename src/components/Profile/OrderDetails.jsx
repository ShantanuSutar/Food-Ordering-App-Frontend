import { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Alert, Avatar, Button, Card, Chip, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { cancelOrder, getOrderDetails } from '../../State/Order/Action'

const ORDER_STAGES = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED']
const statusLabel = (status = '') => status.replaceAll('_', ' ').toLowerCase()

const statusColor = (status) => {
  if (status === 'DELIVERED' || status === 'COMPLETED' || status === 'PAID') return 'success'
  if (status === 'CANCELLED' || status === 'PAYMENT_CANCELLED' || status === 'PAYMENT_FAILED') return 'error'
  if (status === 'READY' || status === 'OUT_FOR_DELIVERY') return 'info'
  return 'warning'
}

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

const OrderTimeline = ({ status }) => {
  if (status === 'CANCELLED') {
    return <Alert severity='error'>This order was cancelled.</Alert>
  }

  const activeIndex = ORDER_STAGES.indexOf(status === 'COMPLETED' ? 'DELIVERED' : status)
  return (
    <ol className='grid gap-3 sm:grid-cols-3 xl:grid-cols-6' aria-label='Order progress'>
      {ORDER_STAGES.map((stage, index) => {
        const completed = index <= activeIndex
        return (
          <li key={stage} className={`rounded-xl border p-3 ${completed ? 'border-pink-500/40 bg-pink-500/10 text-pink-100' : 'border-white/10 text-gray-500'}`}>
            <div className='flex items-center gap-2'>
              {completed ? <CheckCircleIcon fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />}
              <span className='text-xs font-medium capitalize'>{statusLabel(stage)}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

const OrderDetails = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { selectedOrder: order, detailsLoading, detailsError, loading } = useSelector((store) => store.order)

  useEffect(() => {
    if (jwt && orderId) dispatch(getOrderDetails({ orderId, jwt }))
  }, [dispatch, jwt, orderId])

  const handleCancel = async () => {
    if (!window.confirm(`Cancel order #${order.id}? This cannot be undone.`)) return
    await dispatch(cancelOrder({ orderId: order.id, jwt }))
  }

  if (detailsLoading) {
    return <div className='flex min-h-64 items-center justify-center' aria-label='Loading order details'><CircularProgress /></div>
  }

  if (detailsError || !order) {
    return (
      <section className='space-y-4'>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/my-profile/orders')}>Back to orders</Button>
        <Alert severity='error'>{detailsError || 'Order not found.'}</Alert>
      </section>
    )
  }

  const address = order.deliveryAddress || {}
  const canCancel = order.orderStatus === 'PENDING' && order.paymentStatus !== 'PAID'

  return (
    <section className='min-w-0 space-y-6'>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/my-profile/orders')}>Back to orders</Button>

      <header className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>Order details</p>
          <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>Order #{order.id}</h1>
          <p className='mt-2 text-sm text-gray-400'>{formatDate(order.createdAt)}</p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Chip color={statusColor(order.orderStatus)} label={statusLabel(order.orderStatus)} />
          <Chip variant='outlined' color={statusColor(order.paymentStatus)} label={statusLabel(order.paymentStatus || 'PENDING_PAYMENT')} />
        </div>
      </header>

      <Card className='rounded-2xl p-5'>
        <h2 className='!mb-4 !text-lg !font-semibold'>Order progress</h2>
        <OrderTimeline status={order.orderStatus} />
      </Card>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]'>
        <Card className='min-w-0 rounded-2xl p-5'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <div>
              <h2 className='!m-0 !text-lg !font-semibold'>Items</h2>
              <p className='mt-1 text-sm text-gray-400'>{order.restaurant?.name || 'Restaurant unavailable'}</p>
            </div>
            <span className='text-sm text-gray-400'>{order.items?.length || 0} item types</span>
          </div>

          <div className='space-y-4'>
            {(order.items || []).map((item) => (
              <div key={item.id ?? `${item.itemName}-${item.quantity}`} className='flex min-w-0 items-center gap-4'>
                <Avatar
                  variant='rounded'
                  src={item.food?.images?.[0]}
                  alt={item.itemName || item.food?.name || 'Ordered item'}
                  sx={{ width: 64, height: 64 }}
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium'>{item.itemName || item.food?.name || 'Archived item'}</p>
                  <p className='text-sm text-gray-400'>{item.quantity} × ₹{item.unitPrice ?? 0}</p>
                  {item.ingredients?.length > 0 && <p className='mt-1 text-xs text-gray-500'>{item.ingredients.join(', ')}</p>}
                </div>
                <p className='shrink-0 font-semibold'>₹{item.totalPrice ?? (item.unitPrice || 0) * item.quantity}</p>
              </div>
            ))}
          </div>
          <Divider className='!my-5' />
          <div className='flex items-center justify-between text-lg font-semibold'>
            <span>Order total</span>
            <span>₹{order.totalPrice ?? order.totalAmount ?? 0}</span>
          </div>
        </Card>

        <div className='space-y-6'>
          <Card className='rounded-2xl p-5'>
            <h2 className='!mb-3 !text-lg !font-semibold'>Delivery address</h2>
            <address className='space-y-1 text-sm not-italic text-gray-300'>
              <p className='font-medium text-white'>{address.fullName || 'Name unavailable'}</p>
              <p>{address.streetAddress || 'Street unavailable'}</p>
              <p>{[address.city, address.state, address.postalCode].filter(Boolean).join(', ')}</p>
              <p>{address.country}</p>
            </address>
          </Card>

          {canCancel && (
            <Card className='rounded-2xl border border-red-500/20 p-5'>
              <h2 className='!mb-2 !text-lg !font-semibold'>Need to cancel?</h2>
              <p className='mb-4 text-sm text-gray-400'>Pending unpaid orders can be cancelled before payment.</p>
              <Button color='error' variant='outlined' disabled={loading} onClick={handleCancel}>
                Cancel order
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default OrderDetails
