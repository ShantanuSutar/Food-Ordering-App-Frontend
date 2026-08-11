import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import FavouriteIcon from '@mui/icons-material/FavoriteOutlined'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceWallet'
import NotificationsIcon from '@mui/icons-material/NotificationsActive'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import { Divider, Drawer, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favourites", icon: <FavouriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    { title: "Payments", icon: <AccountBalanceIcon /> },
    { title: "Notifications", icon: <NotificationsIcon /> },
    { title: "Events", icon: <EventIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },

]

const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width: 900px)");
    const navigate = useNavigate();

    const handleNavigate = (item) => {
        navigate(`/my-profile/${item.title.toLowerCase()}`)
    }

    return (
        <div>
            <Drawer anchor='left' open={isSmallScreen ? open : true} onClose={handleClose} variant={isSmallScreen ? "temporary" : "permanent"} sx={{ zIndex: 1 }}>
                <div className=' w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16'>
                    {
                        menu.map((item, i) => <>
                            <div onClick={() => handleNavigate(item)} className=' px-5 flex items-center space-x-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </>)
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default ProfileNavigation