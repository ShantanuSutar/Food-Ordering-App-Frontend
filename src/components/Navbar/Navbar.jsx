import { Avatar, IconButton, Badge} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { pink } from '@mui/material/colors'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavbarSearch } from './NavbarSearch'
export const Navbar = () => {
  const {auth, cart} = useSelector(store => store)
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if(auth.user?.role === "ROLE_CUSTOMER"){
      navigate("/my-profile")
    }else{
      navigate("/admin/restaurant")
    }
  }
  
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#e91e63] px-5 py-[0.8rem] lg:px-20">
      <div className=" lg:mr-10 cursor-pointer flex items-center space-x-4">
          <p onClick={() => navigate("/")} className="logo font-semibold text-gray-300 text-2xl">
              DineHub
          </p>
      </div>

      <div className=' flex items-center space-x-2 lg:space-x-10'>
          <NavbarSearch />

          <div className=''>
            {auth.user ? <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white", color:pink.A400, cursor: 'pointer'}}>{auth.user?.fullName[0]?.toUpperCase()}</Avatar> : <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon/>
              </IconButton>}
          </div>

          <div className=''>
            <IconButton onClick={() => navigate("/cart")} >
              <Badge color='primary' badgeContent={cart?.cartItems?.length || 0}>
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}} />
              </Badge>
            </IconButton>
          </div>
     
      </div>
    </nav>
  )
}
