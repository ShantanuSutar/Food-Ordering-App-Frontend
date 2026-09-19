import { Fragment } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import FavouriteIcon from '@mui/icons-material/FavoriteOutlined'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceWallet'
import NotificationsIcon from '@mui/icons-material/NotificationsActive'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import { Divider, Drawer, IconButton, useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../State/Authentication/Action'

const menu = [
  { title: 'Profile', path: '/my-profile', icon: <AccountCircleOutlinedIcon /> },
  { title: 'Orders', path: '/my-profile/orders', icon: <ShoppingBagIcon /> },
  { title: 'Favourites', path: '/my-profile/favourites', icon: <FavouriteIcon /> },
  { title: 'Address', path: '/my-profile/address', icon: <HomeIcon /> },
  { title: 'Payments', path: '/my-profile/payments', icon: <AccountBalanceIcon /> },
  { title: 'Notifications', path: '/my-profile/notifications', icon: <NotificationsIcon /> },
  { title: 'Events', path: '/my-profile/events', icon: <EventIcon /> },
  { title: 'Logout', icon: <LogoutIcon /> },
]

const ProfileNavigation = ({ open = false, handleClose = () => {} }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1023.95px)')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigate = (item) => {
    handleClose()

    if (item.title === 'Logout') {
      dispatch(logout())
      navigate('/')
      return
    }

    navigate(item.path)
  }

  const isActive = (path) => {
    if (!path) return false
    if (path === '/my-profile') return location.pathname === path || location.pathname === `${path}/`
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <Drawer
      anchor='left'
      open={isSmallScreen ? open : true}
      onClose={handleClose}
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      ModalProps={{ keepMounted: true }}
      sx={isSmallScreen
        ? {
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 'min(84vw, 20rem)',
              maxWidth: '100%',
            },
          }
        : {
            width: '100%',
            height: '100%',
            '& .MuiDrawer-paper': {
              position: 'relative',
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
              borderTop: 0,
            },
          }}
    >
      <nav aria-label='Profile navigation' className='flex h-full min-w-0 flex-col overflow-y-auto px-3 py-5'>
        <div className='mb-4 flex items-center justify-between px-3'>
          <div>
            <p className='text-xs font-medium uppercase tracking-[0.2em] text-pink-400'>Account</p>
            <p className='mt-1 text-lg font-semibold text-white'>My profile</p>
          </div>
          {isSmallScreen && (
            <IconButton aria-label='Close profile navigation' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </div>

        <div className='flex flex-col'>
          {menu.map((item, index) => {
            const active = isActive(item.path)
            return (
              <Fragment key={item.title}>
                <button
                  type='button'
                  aria-current={active ? 'page' : undefined}
                  onClick={() => handleNavigate(item)}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-base transition-colors ${
                    active
                      ? 'bg-pink-500/15 font-semibold text-pink-300'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className='flex shrink-0 items-center'>{item.icon}</span>
                  <span className='truncate'>{item.title}</span>
                </button>
                {index !== menu.length - 1 && <Divider className='!my-1 !border-white/5' />}
              </Fragment>
            )
          })}
        </div>
      </nav>
    </Drawer>
  )
}

export default ProfileNavigation
