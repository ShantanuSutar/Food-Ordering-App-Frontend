import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import ProfileNavigation from './ProfileNavigation'
import UserProfile from './UserProfile'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import Address from './Address'
import Favourites from './Favourites'
import Events from './Events'
import Payments from './Payments'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'

const ProfilePlaceholder = ({ title, message }) => (
  <section className='space-y-6'>
    <SectionHeader eyebrow='My profile' title={title} />
    <EmptyState icon={<NotificationsNoneOutlinedIcon />} title={`No ${title.toLowerCase()}`} description={message} />
  </section>
)

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className='w-full min-w-0 overflow-x-clip'>
      <div className='sticky top-16 z-30 flex min-h-14 items-center gap-3 border-b border-slate-400/15 bg-[var(--color-bg)]/95 px-4 backdrop-blur lg:hidden'>
        <Button
          aria-label='Open profile navigation'
          onClick={() => setOpenSideBar(true)}
          startIcon={<MenuIcon />}
          variant='outlined'
          size='small'
        >
          Profile menu
        </Button>
      </div>

      <div className='mx-auto flex w-full max-w-[1600px] min-w-0 items-stretch'>
        <aside className='sticky top-16 hidden h-[calc(100svh-4rem)] w-[23%] min-w-60 max-w-80 shrink-0 self-start border-r border-slate-400/15 lg:block'>
          <ProfileNavigation
            open={openSideBar}
            handleClose={() => setOpenSideBar(false)}
          />
        </aside>

        <main className='min-w-0 flex-1'>
          <div className='mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-12'>
            <Routes>
              <Route index element={<UserProfile />} />
              <Route path='orders' element={<Orders />} />
              <Route path='orders/:orderId' element={<OrderDetails />} />
              <Route path='address' element={<Address />} />
              <Route path='favourites' element={<Favourites />} />
              <Route path='payments' element={<Payments />} />
              <Route
                path='notifications'
                element={<ProfilePlaceholder title='Notifications' message='You have no notifications right now.' />}
              />
              <Route path='events' element={<Events />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
