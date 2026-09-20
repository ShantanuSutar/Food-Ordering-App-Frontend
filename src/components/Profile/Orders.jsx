import { useEffect } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, getUsersOrders } from '../../State/Order/Action'
import OrderCard from './OrderCard'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

const Orders = () => {
  const { orders = [], loading, error } = useSelector((store) => store.order)
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) dispatch(getUsersOrders(jwt))
  }, [dispatch, jwt])

  const handleCancel = async (order) => {
    const confirmed = window.confirm(`Cancel order #${order.id}? This cannot be undone.`)
    if (confirmed) await dispatch(cancelOrder({ orderId: order.id, jwt }))
  }

  return (
    <section className='space-y-6'>
      <SectionHeader eyebrow='My profile' title='My orders' description='Track current orders and revisit past meals.' />

      {loading && orders.length === 0 ? (
        <div className='flex min-h-48 items-center justify-center' aria-label='Loading orders'>
          <CircularProgress />
        </div>
      ) : error && orders.length === 0 ? (
        <Alert severity='error' action={<button className='font-medium' onClick={() => dispatch(getUsersOrders(jwt))}>Retry</button>}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <EmptyState icon={<ReceiptLongOutlinedIcon />} title='No orders yet' description='Your order history will appear here after your first checkout.' />
      ) : (
        <div className='mx-auto w-full max-w-4xl space-y-4'>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onCancel={handleCancel} cancelling={loading} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders
