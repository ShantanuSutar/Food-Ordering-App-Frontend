import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const EventCard = () => {
  return (
    <Card className='w-full min-w-0 overflow-hidden rounded-2xl'>
      <CardMedia
        sx={{ height: 220, width: '100%' }}
        image='https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'
      />
      <CardContent>
        <Typography variant='h5'>Indian Fast Food</Typography>
        <Typography variant='body2'>50% off on your first order</Typography>
        <div className='space-y-2 py-2'>
          <p>Mumbai</p>
          <p className='text-sm text-blue-500'>February 14, 2025, 12:00 AM</p>
          <p className='text-sm text-red-500'>February 14, 2025, 12:00 AM</p>
        </div>
      </CardContent>
      <CardActions>
        <IconButton aria-label='Delete event'>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default EventCard
