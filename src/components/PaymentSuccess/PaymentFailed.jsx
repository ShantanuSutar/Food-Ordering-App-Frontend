import { useEffect } from 'react'
import { Button, Card } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useNavigate } from 'react-router-dom'
import { notifyError } from '../util/toast'

export const PaymentFailed = () => {
  const navigate = useNavigate()

  useEffect(() => {
    notifyError(null, "Payment cancelled", "payment-result")
  }, [])

  return (
    <div className='min-h-screen px-5'>
      <div className='flex h-[90vh] flex-col items-center justify-center'>
        <Card className='box flex w-full flex-col items-center rounded-md p-5 lg:w-1/4'>
          <CancelOutlinedIcon sx={{ fontSize: '5rem', color: '#ff6b6b' }} />
          <h1 className='py-5 text-2xl font-semibold'>Payment cancelled</h1>
          <p className='py-3 text-center text-gray-400'>Your cart is still available. You can try checkout again.</p>
          <Button onClick={() => navigate('/cart')} variant='outlined' sx={{ margin: '1rem 0rem' }}>
            Return to cart
          </Button>
        </Card>
      </div>
    </div>
  )
}
