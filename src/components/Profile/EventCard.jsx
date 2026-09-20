import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

const EventCard = ({ event }) => {
  return (
    <Card className='h-full w-full min-w-0 overflow-hidden rounded-xl transition duration-300 hover:-translate-y-1 hover:border-orange-500/35'>
      <CardMedia
        component='img'
        sx={{ height: 200, width: '100%', objectFit: 'cover' }}
        image={event.image}
        alt={event.name || 'Restaurant event'}
      />
      <CardContent>
        <Typography variant='h6' fontWeight={700}>{event.name || 'DineHub event'}</Typography>
        <div className='mt-4 space-y-2 text-sm text-slate-400'>
          <p className='flex items-center gap-2'><LocationOnOutlinedIcon fontSize='small' color='primary' />{event.location || 'Location to be announced'}</p>
          <p className='flex items-start gap-2'><CalendarMonthOutlinedIcon fontSize='small' color='primary' /><span>{event.startedAt || 'Start time to be announced'}{event.endsAt ? ` – ${event.endsAt}` : ''}</span></p>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
