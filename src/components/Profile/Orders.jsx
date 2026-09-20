import { useEffect } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, getUsersOrders } from '../../State/Order/Action'
import OrderCard from './OrderCard'

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
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>My orders</h1>
      </header>

      {loading && orders.length === 0 ? (
        <div className='flex min-h-48 items-center justify-center' aria-label='Loading orders'>
          <CircularProgress />
        </div>
      ) : error && orders.length === 0 ? (
        <Alert severity='error' action={<button className='font-medium' onClick={() => dispatch(getUsersOrders(jwt))}>Retry</button>}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/15 p-8 text-center text-gray-400'>
          You have not placed any orders yet.
        </div>
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
