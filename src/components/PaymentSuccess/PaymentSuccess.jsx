import { useCallback, useEffect, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import { green } from '@mui/material/colors'
import { Button, Card, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { findCart } from '../../State/Cart/Action'
import { api } from '../config/api'
import { notifyError, notifySuccess } from '../util/toast'

export const PaymentSuccess = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [verificationState, setVerificationState] = useState('verifying')
  const handledPayment = useRef(false)

  const verifyPayment = useCallback(async () => {
    const jwt = localStorage.getItem('jwt')
    const sessionId = searchParams.get('session_id')
    const orderId = Number(id)

    if (!jwt || !sessionId || !Number.isSafeInteger(orderId) || orderId <= 0) {
      setVerificationState('failed')
      notifyError(null, 'Could not verify payment', 'payment-result')
      return
    }

    setVerificationState('verifying')

    try {
      const { data } = await api.post(
        '/api/payment/verify',
        { sessionId, orderId },
        { headers: { Authorization: `Bearer ${jwt}` } },
      )

      if (!data?.verified || data?.paymentStatus !== 'PAID') {
        if (data?.paymentStatus === 'PAYMENT_FAILED') {
          setVerificationState('failed')
          notifyError(null, 'Payment failed', 'payment-result')
        } else {
          setVerificationState('pending')
        }
        return
      }

      await dispatch(findCart(jwt))
      setVerificationState('verified')
      notifySuccess('Payment successful. Your order has been placed.', 'payment-result')
    } catch (error) {
      setVerificationState('failed')
      notifyError(error, 'Could not verify payment', 'payment-result')
    }
  }, [dispatch, id, searchParams])

  useEffect(() => {
    if (handledPayment.current) return
    handledPayment.current = true
    verifyPayment()
  }, [verifyPayment])

  const isVerifying = verificationState === 'verifying'
  const isVerified = verificationState === 'verified'
  const isPending = verificationState === 'pending'

  return (
    <div className='min-h-screen px-5'>
      <div className='flex h-[90vh] flex-col items-center justify-center'>
        <Card className='box flex w-full flex-col items-center rounded-md p-5 lg:w-1/4' aria-live='polite'>
          {isVerifying ? (
            <CircularProgress color='secondary' size={72} />
          ) : isVerified ? (
            <TaskAltIcon sx={{ fontSize: '5rem', color: green[500] }} />
          ) : isPending ? (
            <HourglassTopIcon sx={{ fontSize: '5rem', color: '#f3a847' }} />
          ) : (
            <CancelOutlinedIcon sx={{ fontSize: '5rem', color: '#ff6b6b' }} />
          )}

          <h1 className='py-5 text-2xl font-semibold'>
            {isVerifying
              ? 'Verifying payment'
              : isVerified
                ? 'Order successful'
                : isPending
                  ? 'Payment is processing'
                  : 'Verification failed'}
          </h1>

          <p className='py-3 text-center text-gray-400'>
            {isVerifying
              ? 'Please wait while we securely confirm your payment.'
              : isVerified
                ? 'Thank you for choosing DineHub. Your order has been confirmed.'
                : isPending
                  ? 'Stripe has not confirmed this payment yet. Your cart has not been cleared.'
                  : 'We could not confirm this payment. Your cart has not been cleared.'}
          </p>

          {!isVerifying && (
            <div className='flex flex-wrap justify-center gap-3 py-4'>
              {isPending && (
                <Button onClick={verifyPayment} variant='contained'>
                  Check again
                </Button>
              )}
              <Button onClick={() => navigate(isVerified ? '/' : '/cart')} variant='outlined'>
                {isVerified ? 'Go to home' : 'Return to cart'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
