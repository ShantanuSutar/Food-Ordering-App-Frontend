import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import ProfileNavigation from './ProfileNavigation'
import UserProfile from './UserProfile'
import Orders from './Orders'
import Address from './Address'
import Favourites from './Favourites'
import Events from './Events'
import Payments from './Payments'

const ProfilePlaceholder = ({ title, message }) => (
  <section className='space-y-6'>
    <header>
      <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
      <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>{title}</h1>
    </header>
    <div className='rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-gray-400'>
      {message}
    </div>
  </section>
)

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className='w-full min-w-0 overflow-x-clip'>
      <div className='sticky top-16 z-30 flex min-h-14 items-center gap-3 border-b border-white/10 bg-[#16171d]/95 px-4 backdrop-blur lg:hidden'>
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
        <aside className='sticky top-16 hidden h-[calc(100svh-4rem)] w-[24%] min-w-60 max-w-80 shrink-0 self-start lg:block'>
          <ProfileNavigation
            open={openSideBar}
            handleClose={() => setOpenSideBar(false)}
          />
        </aside>

        <main className='min-w-0 flex-1'>
          <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
            <Routes>
              <Route index element={<UserProfile />} />
              <Route path='orders' element={<Orders />} />
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
