import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button, Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../State/Authentication/Action'
import SectionHeader from '../ui/SectionHeader'

const UserProfile = () => {
  const user = useSelector((store) => store.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <section className='space-y-6'>
      <SectionHeader eyebrow='My profile' title='Account details' description='Your identity and sign-in information.' />

      <Card className='flex w-full flex-col items-center rounded-xl p-6 text-center sm:p-10'>
        <AccountCircleIcon sx={{ fontSize: { xs: '6rem', sm: '8rem' }, color: 'primary.main' }} />
        <h2 className='!mb-1 !mt-4 !text-2xl !font-semibold'>{user?.fullName || 'DineHub customer'}</h2>
        <p className='break-all text-gray-400'>{user?.email || 'Email unavailable'}</p>
        <Button variant='outlined' onClick={handleLogout} sx={{ marginTop: '2rem' }}>
          Logout
        </Button>
      </Card>
    </section>
  )
}

export default UserProfile
