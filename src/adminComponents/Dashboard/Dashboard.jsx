import { Card, CardContent } from '@mui/material'
import { useSelector } from 'react-redux'

import { MenuTable } from '../Menu/MenuTable'
import { OrderTable } from '../Orders/OrderTable'

const Metric = ({ label, value, detail }) => (
  <Card className='relative overflow-hidden transition-colors hover:border-orange-500/30'>
    <span className='absolute inset-y-0 left-0 w-1 bg-orange-500' />
    <CardContent>
      <p className='text-sm text-gray-400'>{label}</p>
      <p className='mt-2 text-3xl font-extrabold text-slate-50'>{value}</p>
      {detail && <p className='mt-1 text-xs text-gray-500'>{detail}</p>}
    </CardContent>
  </Card>
)

export const RestaurantDashboard = () => {
  const menuItems = useSelector((store) => store.menu.menuItems)
  const orders = useSelector((store) => store.restaurantOrder.orders)
  const paidOrders = orders.filter((order) => order.paymentStatus === 'PAID')
  const revenue = paidOrders.reduce((total, order) => total + Number(order.totalPrice ?? order.totalAmount ?? 0), 0)

  return (
    <div className='space-y-6'>
      <div>
        <p className='eyebrow'>Overview</p>
        <h1 className='!mb-0 !mt-2 !text-3xl !font-bold'>Dashboard</h1>
        <p className='mt-1 text-gray-400'>Live summary from your menu and orders.</p>
      </div>
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <Metric label='Total orders' value={orders.length} />
        <Metric label='Paid orders' value={paidOrders.length} />
        <Metric label='Revenue' value={`₹${revenue}`} detail='Paid orders currently loaded' />
        <Metric label='Available menu items' value={menuItems.filter((item) => item.available).length} detail={`${menuItems.length} total items`} />
      </section>
      <section className='grid min-w-0 gap-6 2xl:grid-cols-2'>
        <MenuTable limit={5} />
        <OrderTable limit={5} />
      </section>
    </div>
  )
}
