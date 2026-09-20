import { Avatar, AvatarGroup, Box, Card, CardContent, CardHeader, Chip, CircularProgress, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { updateOrderStatus } from '../../State/Restaurant Order/Action'

const transitions = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['READY', 'CANCELLED'],
  READY: ['OUT_FOR_DELIVERY', 'CANCELLED'],
  OUT_FOR_DELIVERY: ['DELIVERED'],
}

const statusLabel = (status = '') => status.replaceAll('_', ' ').toLowerCase()

const statusColor = (status) => {
  if (status === 'DELIVERED' || status === 'COMPLETED') return 'success'
  if (status === 'CANCELLED') return 'error'
  if (status === 'OUT_FOR_DELIVERY' || status === 'READY') return 'info'
  return 'warning'
}

const OrderItems = ({ items = [] }) => (
  <div className='space-y-1'>
    {items.map((orderItem) => (
      <div key={orderItem.id ?? `${orderItem.food?.id}-${orderItem.itemName}`} className='text-sm'>
        <span>{orderItem.quantity}× {orderItem.itemName || orderItem.food?.name || 'Archived item'}</span>
        {orderItem.unitPrice != null && <span className='ml-2 text-xs text-gray-400'>₹{orderItem.unitPrice} each</span>}
        {orderItem.ingredients?.length > 0 && (
          <span className='ml-2 text-xs text-gray-400'>({orderItem.ingredients.join(', ')})</span>
        )}
      </div>
    ))}
  </div>
)

const isWithinDateRange = (createdAt, fromDate, toDate) => {
  if (!fromDate && !toDate) return true
  const created = new Date(createdAt)
  if (Number.isNaN(created.getTime())) return false
  if (fromDate && created < new Date(`${fromDate}T00:00:00`)) return false
  if (toDate && created > new Date(`${toDate}T23:59:59.999`)) return false
  return true
}

export const OrderTable = ({ limit, status = 'ALL', query = '', fromDate = '', toDate = '' }) => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { orders, loading, error } = useSelector((store) => store.restaurantOrder)
  const normalizedQuery = query.trim().toLowerCase()
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = status === 'ALL' || order.orderStatus === status
    const searchable = [
      order.id,
      order.customer?.fullName,
      ...(order.items || []).flatMap((item) => [item.itemName, item.food?.name]),
    ].filter(Boolean).join(' ').toLowerCase()
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
    return matchesStatus && matchesQuery && isWithinDateRange(order.createdAt, fromDate, toDate)
  })
  const visibleOrders = typeof limit === 'number' ? filteredOrders.slice(0, limit) : filteredOrders

  const handleUpdateOrder = (orderId, orderStatus) => {
    if (!orderStatus) return
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }))
  }

  if (loading && orders.length === 0) {
    return <div className='flex min-h-48 items-center justify-center'><CircularProgress /></div>
  }

  if (error && orders.length === 0) {
    return <p className='rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300'>{error}</p>
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader title={limit ? 'Recent orders' : 'Restaurant orders'} />
      <CardContent className='space-y-3 !pt-0'>
        {visibleOrders.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-400/20 p-8 text-center text-gray-400'>
            No orders found.
          </div>
        ) : visibleOrders.map((order) => {
          const allowed = order.paymentStatus === 'PAID'
            ? transitions[order.orderStatus] || []
            : order.orderStatus === 'PENDING' ? ['CANCELLED'] : []

          return (
            <Box
              key={order.id}
              className='grid gap-4 rounded-xl border border-slate-400/15 p-4 md:grid-cols-[auto_1fr_auto] md:items-center'
            >
              <AvatarGroup max={3} sx={{ justifyContent: { xs: 'flex-end', md: 'flex-start' } }}>
                {(order.items || []).map((item) => (
                  <Avatar
                    key={item.id ?? item.food?.id}
                    src={item.food?.images?.[0]}
                    alt={item.itemName || item.food?.name || 'Order item'}
                  />
                ))}
              </AvatarGroup>

              <div className='min-w-0 space-y-2'>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='font-semibold'>Order #{order.id}</span>
                  <Chip size='small' color={statusColor(order.orderStatus)} label={statusLabel(order.orderStatus)} />
                  <Chip
                    size='small'
                    variant='outlined'
                    color={order.paymentStatus === 'PAID' ? 'success' : 'default'}
                    label={statusLabel(order.paymentStatus || 'PENDING_PAYMENT')}
                  />
                </div>
                <p className='text-sm text-gray-400'>{order.customer?.fullName || 'Customer unavailable'}</p>
                <OrderItems items={order.items} />
                <p className='font-medium'>₹{order.totalPrice ?? order.totalAmount ?? 0}</p>
              </div>

              <Select
                size='small'
                displayEmpty
                value=''
                disabled={allowed.length === 0 || loading}
                onChange={(event) => handleUpdateOrder(order.id, event.target.value)}
                sx={{ minWidth: 190 }}
                renderValue={() => allowed.length ? 'Update status' : 'No actions'}
              >
                {allowed.map((status) => (
                  <MenuItem key={status} value={status}>{statusLabel(status)}</MenuItem>
                ))}
              </Select>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}
