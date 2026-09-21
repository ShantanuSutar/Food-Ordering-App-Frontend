import { Avatar, Badge, IconButton, Tooltip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavbarSearch } from './NavbarSearch'
import DineHubMark from '../ui/DineHubMark'
export const Navbar = () => {
  const auth = useSelector((store) => store.auth)
  const cart = useSelector((store) => store.cart)
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if(auth.user?.role === "ROLE_CUSTOMER"){
      navigate("/my-profile")
    }else{
      navigate("/admin/restaurant")
    }
  }
  
  return (
    <nav className="sticky top-0 z-[1100] w-full border-b border-slate-400/15 bg-[var(--color-bg)]/92 backdrop-blur-xl">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <button onClick={() => navigate('/')} className="group flex items-center gap-3 rounded-lg text-left" aria-label="DineHub home">
          <DineHubMark className="h-9 w-9 shrink-0" />
          <span>
            <span className="block text-xl font-extrabold tracking-tight text-slate-50">Dine<span className="text-orange-500">Hub</span></span>
            <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">Good food, delivered</span>
          </span>
        </button>

        <div className='flex items-center gap-1 sm:gap-2'>
          <NavbarSearch />
          {auth.user ? (
            <Tooltip title={auth.user.fullName || 'Open profile'}>
              <IconButton onClick={handleAvatarClick} aria-label='Open profile'>
                <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', color: '#111827', fontSize: '0.9rem', fontWeight: 800 }}>
                  {auth.user?.fullName?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Sign in'>
              <IconButton onClick={() => navigate('/account/login')} aria-label='Sign in'><PersonIcon /></IconButton>
            </Tooltip>
          )}
          <Tooltip title='Cart'>
            <IconButton onClick={() => navigate('/cart')} aria-label={`Cart with ${cart?.cartItems?.length || 0} items`}>
              <Badge color='primary' badgeContent={cart?.cartItems?.length || 0} max={99} sx={{ '& .MuiBadge-badge': { color: '#111827', fontWeight: 800, border: '2px solid #111827' } }}>
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}} />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  )
}
