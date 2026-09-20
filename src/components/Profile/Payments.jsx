import { useEffect } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import {
  Button,
  Card,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPaymentHistory } from '../../State/Order/Action'

const EMPTY_PAYMENTS = []

const statusDetails = (status) => {
  switch (status) {
    case 'PAID':
      return { label: 'Paid', color: 'success' }
    case 'PENDING_PAYMENT':
      return { label: 'Pending', color: 'warning' }
    case 'PAYMENT_FAILED':
      return { label: 'Failed', color: 'error' }
    case 'PAYMENT_CANCELLED':
    case 'CANCELLED':
    case 'CANCELED':
      return { label: 'Cancelled', color: 'default' }
    default:
      return {
        label: status ? status.replaceAll('_', ' ').toLowerCase() : 'Unknown',
        color: 'default',
      }
  }
}

const formatMoney = (amount, currency) => {
  if (amount == null) return '—'

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: (currency || 'INR').toUpperCase(),
    }).format(amount / 100)
  } catch {
    return `${(amount / 100).toFixed(2)} ${(currency || 'INR').toUpperCase()}`
  }
}

const formatDate = (payment) => {
  const value = payment.paidAt || payment.createdAt
  if (!value) return '—'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const PaymentStatusChip = ({ status }) => {
  const details = statusDetails(status)
  return <Chip label={details.label} color={details.color} size='small' variant='outlined' />
}

const PaymentSkeletons = () => (
  <div className='space-y-3' aria-label='Loading payment history'>
    {[1, 2, 3].map((item) => (
      <Skeleton key={item} variant='rounded' height={88} className='w-full' />
    ))}
  </div>
)

const Payments = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const payments = useSelector((store) => store.order.payments ?? EMPTY_PAYMENTS)
  const loading = useSelector((store) => store.order.paymentsLoading)
  const error = useSelector((store) => store.order.paymentsError)
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if (jwt) dispatch(getPaymentHistory(jwt))
  }, [dispatch, jwt])

  const viewOrder = (orderId) => navigate(`/my-profile/orders/${orderId}`)

  return (
    <section className='min-w-0 space-y-6'>
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>Payment history</h1>
        <p className='mt-2 max-w-2xl text-sm text-gray-400'>
          Secure Stripe payments linked to your DineHub orders.
        </p>
      </header>

      {error && (
        <div role='alert' className='flex flex-col items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 sm:flex-row sm:items-center sm:justify-between'>
          <p>{error}</p>
          <Button color='error' variant='outlined' onClick={() => dispatch(getPaymentHistory(jwt))}>
            Try again
          </Button>
        </div>
      )}

      {loading && payments.length === 0 ? (
        <PaymentSkeletons />
      ) : payments.length === 0 ? (
        <Card className='flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/20 p-8 text-center'>
          <CreditCardOffIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />
          <div>
            <h2 className='!mb-2 !text-xl !font-semibold'>No payment history</h2>
            <p className='text-gray-400'>Payments will appear here after you begin checkout for an order.</p>
          </div>
        </Card>
      ) : (
        <>
          <TableContainer component={Card} className='!hidden overflow-hidden !rounded-2xl md:!block'>
            <Table aria-label='Payment history'>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell align='right'>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.orderId} hover>
                    <TableCell>
                      <p className='font-semibold text-white'>#{payment.orderId}</p>
                      {payment.paymentIntentId && (
                        <p className='mt-1 max-w-36 truncate text-xs text-gray-500' title={payment.paymentIntentId}>
                          {payment.paymentIntentId}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{payment.restaurantName || 'Restaurant unavailable'}</TableCell>
                    <TableCell className='whitespace-nowrap'>{formatDate(payment)}</TableCell>
                    <TableCell>{payment.paymentMethod || 'Stripe'}</TableCell>
                    <TableCell align='right' className='whitespace-nowrap font-semibold'>
                      {formatMoney(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell><PaymentStatusChip status={payment.paymentStatus} /></TableCell>
                    <TableCell align='right'>
                      <Button size='small' endIcon={<ArrowForwardIcon />} onClick={() => viewOrder(payment.orderId)}>
                        View order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className='space-y-4 md:hidden'>
            {payments.map((payment) => (
              <Card key={payment.orderId} className='min-w-0 rounded-2xl p-5'>
                <div className='flex min-w-0 items-start justify-between gap-3'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-300'>
                      <ReceiptLongIcon />
                    </span>
                    <div className='min-w-0'>
                      <p className='font-semibold text-white'>Order #{payment.orderId}</p>
                      <p className='truncate text-sm text-gray-400'>{payment.restaurantName || 'Restaurant unavailable'}</p>
                    </div>
                  </div>
                  <PaymentStatusChip status={payment.paymentStatus} />
                </div>

                <dl className='mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm'>
                  <div>
                    <dt className='text-gray-500'>Amount</dt>
                    <dd className='mt-1 font-semibold text-white'>{formatMoney(payment.amount, payment.currency)}</dd>
                  </div>
                  <div>
                    <dt className='text-gray-500'>Method</dt>
                    <dd className='mt-1 text-gray-200'>{payment.paymentMethod || 'Stripe'}</dd>
                  </div>
                  <div className='col-span-2'>
                    <dt className='text-gray-500'>Date</dt>
                    <dd className='mt-1 text-gray-200'>{formatDate(payment)}</dd>
                  </div>
                  {payment.paymentIntentId && (
                    <div className='col-span-2 min-w-0'>
                      <dt className='text-gray-500'>Payment reference</dt>
                      <dd className='mt-1 truncate font-mono text-xs text-gray-300' title={payment.paymentIntentId}>
                        {payment.paymentIntentId}
                      </dd>
                    </div>
                  )}
                </dl>

                <Button className='!mt-4 !px-0' endIcon={<ArrowForwardIcon />} onClick={() => viewOrder(payment.orderId)}>
                  View order
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Payments
