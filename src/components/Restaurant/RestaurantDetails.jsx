import { Grid } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const RestaurantDetails = () => {
  return (
    <div className=' px-5 lg:px-20'>
        <section>
            <h3 className=' text-gray-500 py-2 mt-10'>Home/India/Indian Fast Food/3</h3>
            <div>
                <Grid container spacing={{ xs: 1, lg: 3 }}>
                    <Grid size={12}>
                        <img
                        className="w-full h-[40vh] object-cover"
                        src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                        alt=""
                        />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <img
                        className="w-full h-[40vh] object-cover"
                        src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
                        alt=""
                        />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <img
                        className="w-full h-[40vh] object-cover"
                        src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"
                        alt=""
                        />
                    </Grid>
                    </Grid>
            </div>

            <div className=' pt-3 pb-5'>
                <h1 className=' text-4xl font-semibold'>Indian Fast Food</h1>
                <p className=' text-gray-500 mt-1'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos sint aliquam laborum esse dolores architecto a quam ab amet et totam, veniam temporibus, incidunt laudantium nam omnis nesciunt ipsa veritatis.</p>
                <div className=' space-y-3 mt-3'>
                    <p className=' text-gray-500 flex items-center gap-3'> 
                        <LocationOnIcon/>
                        <span>Mumbai, Maharashtra</span>
                    </p>
                    <p className=' text-gray-500 flex items-center gap-3'> 
                        <CalendarTodayIcon/>
                        <span>Mon-Sum: 9:00AM - 9:00PM (Today)</span>
                    </p>

                </div>
            </div>
        </section>
    </div>
  )
}

export default RestaurantDetails