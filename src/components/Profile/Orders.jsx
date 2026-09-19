import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../State/Order/Action'
import OrderCard from './OrderCard'

const Orders = () => {
  const orders = useSelector((store) => store.order.orders || [])
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) dispatch(getUsersOrders(jwt))
  }, [dispatch, jwt])

  const orderItems = orders.flatMap((order) =>
    (order.items || []).map((item) => ({ item, order })),
  )

  return (
    <section className='space-y-6'>
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>My orders</h1>
      </header>

      {orderItems.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/15 p-8 text-center text-gray-400'>
          You have not placed any orders yet.
        </div>
      ) : (
        <div className='mx-auto w-full max-w-4xl space-y-4'>
          {orderItems.map(({ item, order }) => (
            <OrderCard key={item.id ?? `${order.id}-${item.food?.id}`} item={item} order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders
