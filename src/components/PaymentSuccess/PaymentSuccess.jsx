import { useEffect, useRef, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { green } from '@mui/material/colors'
import { Button, Card, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { clearCartAction } from '../../State/Cart/Action'
import { api } from '../config/api'
import { notifyError, notifySuccess } from '../util/toast'

export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [verificationState, setVerificationState] = useState('verifying');
    const handledPayment = useRef(false);

    useEffect(() => {
        if (handledPayment.current) return;
        handledPayment.current = true;

        const verifyPayment = async () => {
            const jwt = localStorage.getItem('jwt');
            const sessionId = searchParams.get('session_id');
            const orderId = Number(id);

            if (!jwt || !sessionId || !Number.isInteger(orderId)) {
                setVerificationState('failed');
                notifyError(null, "Could not verify payment", "payment-result");
                return;
            }

            try {
                const { data } = await api.get('/api/payment/verify', {
                    params: { session_id: sessionId, order_id: orderId },
                    headers: { Authorization: `Bearer ${jwt}` },
                });

                if (!data?.verified) throw new Error('Payment was not verified');

                setVerificationState('verified');
                notifySuccess("Payment successful", "payment-result");
                dispatch(clearCartAction({ silentSuccess: true }));
            } catch (error) {
                setVerificationState('failed');
                notifyError(error, "Could not verify payment", "payment-result");
            }
        };

        verifyPayment();
    }, [dispatch, id, searchParams]);

    const isVerifying = verificationState === 'verifying';
    const isVerified = verificationState === 'verified';

  return (
    <div className=' min-h-screen px-5'>
        <div className=' flex flex-col items-center justify-center h-[90vh]'>
            <Card className=' box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                {isVerifying ? (
                    <CircularProgress color='secondary' size={72} />
                ) : isVerified ? (
                    <TaskAltIcon sx={{fontSize: "5rem", color: green[500]}} />
                ) : (
                    <CancelOutlinedIcon sx={{fontSize: "5rem", color: '#ff6b6b'}} />
                )}
                <h1 className=' py-5 text-2xl font-semibold'>
                    {isVerifying ? 'Verifying payment' : isVerified ? 'Order successful' : 'Verification failed'}
                </h1>
                <p className=' py-3 text-center text-gray-400'>
                    {isVerifying
                        ? 'Please wait while we confirm your payment.'
                        : isVerified
                            ? 'Thank you for choosing DineHub. Your order has been confirmed.'
                            : 'We could not confirm this payment. Your cart has not been cleared.'}
                </p>
                {!isVerifying && (
                    <Button onClick={() => navigate(isVerified ? "/" : "/cart")} variant='outlined' className=' py-5' sx={{margin: "1rem 0rem"}}>
                        {isVerified ? 'Go to home' : 'Return to cart'}
                    </Button>
                )}
            </Card>
        </div>

    </div>
  )
}
