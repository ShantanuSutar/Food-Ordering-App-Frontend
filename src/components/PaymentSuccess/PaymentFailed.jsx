import { useEffect, useRef, useState } from 'react'
import { Button, Card } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { notifyError } from '../util/toast'
import { cancelOrder } from '../../State/Order/Action'

export const PaymentFailed = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const handledCancellation = useRef(false)
  const orderId = Number(searchParams.get('order_id'))
  const canRecordCancellation = Boolean(
    localStorage.getItem('jwt') && Number.isSafeInteger(orderId) && orderId > 0,
  )
  const [cancelling, setCancelling] = useState(canRecordCancellation)

  useEffect(() => {
    if (handledCancellation.current) return
    handledCancellation.current = true
    notifyError(null, "Payment cancelled", "payment-result")
    const jwt = localStorage.getItem('jwt')
    if (!jwt || !canRecordCancellation) return

    dispatch(cancelOrder({ orderId, jwt, silent: true })).finally(() => setCancelling(false))
  }, [canRecordCancellation, dispatch, orderId])

  return (
    <main className='page-shell flex min-h-[calc(100svh-4rem)] items-center justify-center py-12'>
        <Card className='flex w-full max-w-lg flex-col items-center rounded-xl p-7 text-center sm:p-10'>
          <CancelOutlinedIcon sx={{ fontSize: '5rem', color: 'error.main' }} />
          <h1 className='py-5 text-2xl font-semibold'>Payment cancelled</h1>
          <p className='py-3 text-center text-gray-400'>Your cart is still available. You can try checkout again.</p>
          <Button disabled={cancelling} onClick={() => navigate('/cart')} variant='outlined' sx={{ margin: '1rem 0rem' }}>
            Return to cart
          </Button>
        </Card>
    </main>
  )
}
