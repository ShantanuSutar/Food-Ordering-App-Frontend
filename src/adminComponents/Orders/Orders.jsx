import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { OrderTable } from './OrderTable'

const orderStatuses = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Preparing', value: 'PREPARING' },
  { label: 'Ready', value: 'READY' },
  { label: 'Out for delivery', value: 'OUT_FOR_DELIVERY' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

export const Orders = () => {
  const [filterValue, setFilterValue] = useState('ALL')

  return (
    <div className='space-y-4'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>Order status</Typography>
        <FormControl>
          <RadioGroup
            onChange={(event) => setFilterValue(event.target.value)}
            row
            name='order-status'
            value={filterValue}
          >
            {orderStatuses.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: 'gray' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable status={filterValue} />
    </div>
  )
}
