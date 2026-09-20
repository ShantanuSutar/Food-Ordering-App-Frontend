import { Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
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
  const [query, setQuery] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  return (
    <div className='space-y-4'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>Find orders</Typography>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          <TextField
            label='Search orders'
            placeholder='Order ID, customer or item'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <FormControl>
            <InputLabel id='order-status-label'>Status</InputLabel>
            <Select
              labelId='order-status-label'
              label='Status'
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            >
              {orderStatuses.map((item) => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='From date'
            type='date'
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label='To date'
            type='date'
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </div>
      </Card>
      <OrderTable status={filterValue} query={query} fromDate={fromDate} toDate={toDate} />
    </div>
  )
}
