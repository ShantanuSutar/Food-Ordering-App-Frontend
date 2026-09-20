import { AdminPanelSettings, Category, Dashboard, Fastfood, Logout, ShoppingBag, ShopTwo } from '@mui/icons-material'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logout } from '../../State/Authentication/Action'

const menu = [
  { title: 'Dashboard', icon: <Dashboard />, path: '' },
  { title: 'Orders', icon: <ShoppingBag />, path: 'orders' },
  { title: 'Menu', icon: <ShopTwo />, path: 'menu' },
  { title: 'Food Categories', icon: <Category />, path: 'category' },
  { title: 'Ingredients', icon: <Fastfood />, path: 'ingredients' },
  { title: 'Restaurant Details', icon: <AdminPanelSettings />, path: 'details' },
]

export const AdminSidebar = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:1023px)')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleNavigate = (path) => {
    navigate(path ? `/admin/restaurant/${path}` : '/admin/restaurant')
    if (isSmallScreen) handleClose()
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
    navigate('/')
  }

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={isSmallScreen ? open : true}
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 1200,
        '& .MuiDrawer-paper': {
          width: { xs: '82vw', sm: 300, lg: 260 },
          maxWidth: 320,
          borderRightColor: 'rgba(255,255,255,0.1)',
          backgroundImage: 'none',
        },
      }}
    >
      <div className='flex min-h-full flex-col px-3 py-5'>
        <div className='px-3 pb-6'>
          <p className='text-2xl font-bold text-pink-400'>DineHub</p>
          <p className='text-sm text-gray-400'>Owner tools</p>
        </div>

        <List className='flex-1'>
          {menu.map((item) => {
            const target = item.path ? `/admin/restaurant/${item.path}` : '/admin/restaurant'
            const isSelected = item.path
              ? location.pathname === target || location.pathname.startsWith(`${target}/`)
              : location.pathname === target
            return (
              <ListItemButton
                key={item.path || 'dashboard'}
                selected={isSelected}
                onClick={() => handleNavigate(item.path)}
                sx={{ mb: 0.75, borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 42 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )
          })}
        </List>

        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: 'error.light' }}>
          <ListItemIcon sx={{ minWidth: 42, color: 'inherit' }}><Logout /></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </div>
    </Drawer>
  )
}
