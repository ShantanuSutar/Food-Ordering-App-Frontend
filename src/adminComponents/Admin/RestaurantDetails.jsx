import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../State/Restaurant/Action';


export const RestaurantDetails = () => {

  const {restaurant} = useSelector(store => store)
  const dispatch = useDispatch();

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: localStorage.getItem("jwt")
    }))
  }
  return (
    <div className=' lg:px-20 px-5 pb-10'>
      <div className=' py-5 flex flex-col justify-center items-center gap-5'>
        <div className='py-5 flex justify-center items-center gap-6'>
          <h1 className='text-2xl font-black'>
            {restaurant.usersRestaurant.name}
          </h1>

          <Button
            color={!restaurant.usersRestaurant.open ? "primary" : "error"}
            variant='contained'
            onClick={handleRestaurantStatus}
            size='large'
          >
            {restaurant.usersRestaurant.open ? "Close" : "Open"}
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <Card>
              <CardHeader title={<span className=' text-gray-300'>Restaurant</span>} />
            </Card>
            <CardContent>
              <div className=' space-y-4 text-gray-200'>
                <div className=' flex '>
                  <p className=' w-48'>Owner</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                      {restaurant.usersRestaurant.owner.fullName}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Restaurant Name</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant.name}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Cuisine Type</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant.cuisineType}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Opening Hours</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant.openingHours}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Status</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant.open ? <span className=' px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span>
                      : <span className=' px-5 py-2 rounded-full bg-red-400 text-gray-950'>Closed</span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Grid>
          <Grid item size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title={<span className=' text-gray-300'>Address</span>} />
            </Card>
            <CardContent>
              <div className=' space-y-4 text-gray-200'>
                <div className=' flex '>
                  <p className=' w-48'>Country</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    Shantanu
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>City</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    indian fast food
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Postal Code</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    indian
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Street Address</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    monday - sunday 9am - 9pm
                  </p>
                </div>
                
              </div>
            </CardContent>
          </Grid>
          <Grid item size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title={<span className=' text-gray-300'>Contact</span>} />
            </Card>
            <CardContent>
              <div className=' space-y-4 text-gray-200'>
                <div className=' flex '>
                  <p className=' w-48'>Email</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Mobile</p>
                  <p className=' text-gray-400'>
                    <span className=' pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.mobile}
                  </p>
                </div>
                <div className=' flex '>
                  <p className=' w-48'>Social</p>
                  <p className=' text-gray-400 flex items-center pb-3 gap-2'>
                    <span className=' pr-5'>-</span>
                    <div>
                      <span className=' pr-5'>-</span>
                      <a href={restaurant.usersRestaurant?.contactInformation?.instagram}>
                        <InstagramIcon sx={{fontSize: "3rem"}} />
                      </a>c
                      <a href={restaurant.usersRestaurant?.contactInformation?.twitter}>
                        <TwitterIcon sx={{fontSize: "3rem"}} />
                      </a>
                      <a href={restaurant.usersRestaurant?.contactInformation?.linkedin}>
                        <LinkedInIcon sx={{fontSize: "3rem"}} />
                      </a>
                      <a href={restaurant.usersRestaurant?.contactInformation?.facebook}>
                        <FacebookIcon sx={{fontSize: "3rem"}} />
                      </a>
                    </div>
                  </p>
                </div>
                
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
