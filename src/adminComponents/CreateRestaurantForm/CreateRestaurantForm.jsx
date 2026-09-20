import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { createRestaurant, updateRestaurant } from '../../State/Restaurant/Action'
import { notifyError } from '../../components/util/toast'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary'

const valuesFor = (restaurant) => ({
  name: restaurant?.name || '',
  description: restaurant?.description || '',
  cuisineType: restaurant?.cuisineType || '',
  streetAddress: restaurant?.address?.streetAddress || '',
  city: restaurant?.address?.city || '',
  state: restaurant?.address?.state || '',
  postalCode: restaurant?.address?.postalCode || '',
  country: restaurant?.address?.country || '',
  email: restaurant?.contactInformation?.email || '',
  mobile: restaurant?.contactInformation?.mobile || '',
  twitter: restaurant?.contactInformation?.twitter || '',
  instagram: restaurant?.contactInformation?.instagram || '',
  openingHours: restaurant?.openingHours || 'Mon-Sun: 9:00 AM - 10:00 PM',
  images: restaurant?.images || [],
})

const schema = Yup.object({
  name: Yup.string().trim().required('Restaurant name is required'),
  description: Yup.string().trim().required('Description is required'),
  cuisineType: Yup.string().trim().required('Cuisine type is required'),
  streetAddress: Yup.string().trim().required('Street address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  postalCode: Yup.string().trim().required('Postal code is required'),
  country: Yup.string().trim().required('Country is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  mobile: Yup.string().trim().required('Mobile number is required'),
  openingHours: Yup.string().trim().required('Opening hours are required'),
})

const fieldError = (formik, name) => ({
  error: Boolean(formik.touched[name] && formik.errors[name]),
  helperText: formik.touched[name] ? formik.errors[name] : '',
})

export const CreateRestaurantForm = ({ restaurant = null, onSaved }) => {
  const [uploadingImage, setUploadingImage] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((store) => store.restaurant.loading)
  const jwt = localStorage.getItem('jwt')
  const editing = Boolean(restaurant?.id)

  const formik = useFormik({
    initialValues: valuesFor(restaurant),
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      const data = {
        name: values.name.trim(),
        description: values.description.trim(),
        cuisineType: values.cuisineType.trim(),
        address: {
          fullName: values.name.trim(),
          streetAddress: values.streetAddress.trim(),
          city: values.city.trim(),
          state: values.state.trim(),
          postalCode: values.postalCode.trim(),
          country: values.country.trim(),
        },
        contactInformation: {
          email: values.email.trim(),
          mobile: values.mobile.trim(),
          twitter: values.twitter.trim(),
          instagram: values.instagram.trim(),
        },
        openingHours: values.openingHours.trim(),
        images: values.images,
      }

      const saved = editing
        ? await dispatch(updateRestaurant({ restaurantId: restaurant.id, restaurantData: data, jwt }))
        : await dispatch(createRestaurant({ data, token: jwt }))
      if (saved) onSaved?.(saved)
    },
  })

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      setUploadingImage(true)
      const image = await uploadImageToCloudinary(file)
      formik.setFieldValue('images', [...formik.values.images, image])
    } catch (error) {
      notifyError(error, 'Could not upload image', 'restaurant-image-upload')
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  return (
    <div className='flex min-h-full items-center justify-center px-4 py-8'>
      <div className='w-full max-w-4xl'>
        <h1 className='pb-6 text-center text-2xl font-bold'>{editing ? 'Edit restaurant' : 'Create your restaurant'}</h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <div className='flex flex-wrap gap-4'>
            <div className='relative'>
              <input type='file' accept='image/*' id='restaurant-image' className='hidden' onChange={handleImageChange} />
              <label htmlFor='restaurant-image' className='flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-600'>
                {uploadingImage ? <CircularProgress size={26} /> : <AddPhotoAlternate />}
              </label>
            </div>
            {formik.values.images.map((image) => (
              <div key={image} className='relative h-24 w-24'>
                <img className='h-full w-full rounded-xl object-cover' src={image} alt='Restaurant' />
                <IconButton
                  size='small' aria-label='Remove image'
                  sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,.65)' }}
                  onClick={() => formik.setFieldValue('images', formik.values.images.filter((item) => item !== image))}
                >
                  <Close fontSize='small' />
                </IconButton>
              </div>
            ))}
          </div>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}><TextField fullWidth name='name' label='Name' {...formik.getFieldProps('name')} {...fieldError(formik, 'name')} /></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={2} name='description' label='Description' {...formik.getFieldProps('description')} {...fieldError(formik, 'description')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='cuisineType' label='Cuisine type' {...formik.getFieldProps('cuisineType')} {...fieldError(formik, 'cuisineType')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='openingHours' label='Opening hours' {...formik.getFieldProps('openingHours')} {...fieldError(formik, 'openingHours')} /></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth name='streetAddress' label='Street address' {...formik.getFieldProps('streetAddress')} {...fieldError(formik, 'streetAddress')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='city' label='City' {...formik.getFieldProps('city')} {...fieldError(formik, 'city')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='state' label='State' {...formik.getFieldProps('state')} {...fieldError(formik, 'state')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='postalCode' label='Postal code' {...formik.getFieldProps('postalCode')} {...fieldError(formik, 'postalCode')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='country' label='Country' {...formik.getFieldProps('country')} {...fieldError(formik, 'country')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='email' label='Email' {...formik.getFieldProps('email')} {...fieldError(formik, 'email')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='mobile' label='Mobile' {...formik.getFieldProps('mobile')} {...fieldError(formik, 'mobile')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='instagram' label='Instagram URL' {...formik.getFieldProps('instagram')} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth name='twitter' label='Twitter/X URL' {...formik.getFieldProps('twitter')} /></Grid>
          </Grid>

          <Button type='submit' variant='contained' disabled={loading || uploadingImage}>
            {loading ? 'Saving…' : editing ? 'Save changes' : 'Create restaurant'}
          </Button>
        </form>
      </div>
    </div>
  )
}
