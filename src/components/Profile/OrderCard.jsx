import { Button, Card } from '@mui/material'

const OrderCard = ({ item, order }) => {
  const image = item.food?.images?.[0]

  return (
    <Card className='flex min-w-0 flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
      <div className='flex min-w-0 items-center gap-4'>
        <div className='h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5'>
          {image && <img className='h-full w-full object-cover' src={image} alt={item.food?.name || 'Ordered food'} />}
        </div>
        <div className='min-w-0'>
          <p className='truncate font-medium text-white'>{item.food?.name || 'Menu item'}</p>
          <p className='text-sm text-gray-400'>${item.totalPrice}</p>
        </div>
      </div>
      <Button className='self-start sm:self-auto'>{order.orderStatus}</Button>
    </Card>
  )
}

export default OrderCard
