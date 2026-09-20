import { useEffect } from 'react'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import { Alert, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../State/Restaurant/Action'
import EventCard from './EventCard'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

const Events = () => {
  const dispatch = useDispatch()
  const { events = [], loading, error } = useSelector((store) => store.restaurant)
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if (jwt) dispatch(getAllEvents({ jwt }))
  }, [dispatch, jwt])

  return (
    <section className='space-y-6'>
      <SectionHeader eyebrow='Discover' title='Events' description='Offers and experiences shared by DineHub restaurants.' />

      {error && <Alert severity='error'>{error}</Alert>}
      {loading && events.length === 0 ? (
        <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>{[1, 2, 3].map((item) => <Skeleton key={item} variant='rounded' height={330} />)}</div>
      ) : events.length === 0 ? (
        <EmptyState icon={<EventAvailableOutlinedIcon />} title='No upcoming events' description='Restaurant events and offers will appear here.' />
      ) : (
        <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </section>
  )
}

export default Events
