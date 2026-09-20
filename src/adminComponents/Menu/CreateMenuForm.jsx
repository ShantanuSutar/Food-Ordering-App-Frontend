import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { createMenuItem, updateMenuItem } from '../../State/Menu/Action'
import { notifyError } from '../../components/util/toast'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary'

const schema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  description: Yup.string().trim().required('Description is required'),
  price: Yup.number()
    .typeError('Enter a valid price')
    .integer('Price must be a whole number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  categoryId: Yup.number().required('Category is required'),
  vegetarian: Yup.boolean().required('Choose whether the item is vegetarian'),
  seasonal: Yup.boolean().required('Choose whether the item is seasonal'),
})

const valuesFor = (food) => ({
  name: food?.name || '',
  description: food?.description || '',
  price: food?.price ?? '',
  categoryId: food?.foodCategory?.id || '',
  vegetarian: food?.vegetarian ?? true,
  seasonal: food?.seasonal ?? false,
  ingredientIds: (food?.ingredients || []).map((ingredient) => ingredient.id),
  images: food?.images || [],
})

export const CreateMenuForm = () => {
  const [uploadingImage, setUploadingImage] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { foodId } = useParams()
  const jwt = localStorage.getItem('jwt')
  const restaurantId = useSelector((store) => store.restaurant.usersRestaurant?.id)
  const categories = useSelector((store) => store.restaurant.categories)
  const ingredientOptions = useSelector((store) => store.ingredients.ingredients)
  const food = useSelector((store) => store.menu.menuItems.find((item) => String(item.id) === foodId))
  const loading = useSelector((store) => store.menu.loading)
  const editing = Boolean(foodId)

  const formik = useFormik({
    initialValues: valuesFor(food),
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!restaurantId) return
      const menu = {
          name: values.name.trim(),
          description: values.description.trim(),
          price: Number(values.price),
          categoryId: Number(values.categoryId),
          restaurantId,
          vegetarian: values.vegetarian === true || values.vegetarian === 'true',
          seasonal: values.seasonal === true || values.seasonal === 'true',
          ingredientIds: values.ingredientIds.map(Number),
          images: values.images,
      }
      const saved = editing
        ? await dispatch(updateMenuItem({ foodId, menu, jwt }))
        : await dispatch(createMenuItem({ menu, jwt }))
      if (saved) navigate('/admin/restaurant/menu')
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
      notifyError(error, 'Could not upload image', 'menu-image-upload')
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  return (
    <div className='mx-auto w-full max-w-4xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>{editing ? 'Edit menu item' : 'Add menu item'}</h1>
        <p className='mt-1 text-gray-400'>{editing ? 'Update the item details shown to customers.' : 'New items become available immediately.'}</p>
      </div>
      {editing && !food && !loading && (
        <p className='mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300'>Menu item was not found.</p>
      )}
      {categories.length === 0 && (
        <p className='mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200'>
          Create a food category before adding a menu item.
        </p>
      )}
      <form onSubmit={formik.handleSubmit} className='space-y-5'>
        <div className='flex flex-wrap gap-4'>
          <div className='relative'>
            <input type='file' accept='image/*' id='menu-image' className='hidden' onChange={handleImageChange} />
            <label htmlFor='menu-image' className='flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-600'>
              {uploadingImage ? <CircularProgress size={26} /> : <AddPhotoAlternate />}
            </label>
          </div>
          {formik.values.images.map((image) => (
            <div key={image} className='relative h-24 w-24'>
              <img className='h-full w-full rounded-xl object-cover' src={image} alt='Menu item' />
              <IconButton
                size='small' aria-label='Remove image'
                sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,.65)' }}
                onClick={() => formik.setFieldValue('images', formik.values.images.filter((item) => item !== image))}
              ><Close fontSize='small' /></IconButton>
            </div>
          ))}
        </div>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label='Name' {...formik.getFieldProps('name')} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth multiline minRows={2} label='Description' {...formik.getFieldProps('description')} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth type='number' slotProps={{ htmlInput: { min: 1, step: 1 } }} label='Price' {...formik.getFieldProps('price')} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}>
              <InputLabel id='food-category-label'>Category</InputLabel>
              <Select labelId='food-category-label' label='Category' {...formik.getFieldProps('categoryId')}>
                {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel id='food-ingredients-label'>Ingredients</InputLabel>
              <Select
                labelId='food-ingredients-label' multiple label='Ingredients'
                value={formik.values.ingredientIds}
                onChange={(event) => formik.setFieldValue('ingredientIds', event.target.value)}
                input={<OutlinedInput label='Ingredients' />}
                renderValue={(selected) => (
                  <div className='flex flex-wrap gap-1'>
                    {selected.map((id) => <Chip key={id} label={ingredientOptions.find((item) => item.id === id)?.name || id} />)}
                  </div>
                )}
              >
                {ingredientOptions.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id='seasonal-label'>Seasonal</InputLabel>
              <Select labelId='seasonal-label' label='Seasonal' value={formik.values.seasonal} onChange={(event) => formik.setFieldValue('seasonal', event.target.value)}>
                <MenuItem value={true}>Yes</MenuItem><MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id='vegetarian-label'>Vegetarian</InputLabel>
              <Select labelId='vegetarian-label' label='Vegetarian' value={formik.values.vegetarian} onChange={(event) => formik.setFieldValue('vegetarian', event.target.value)}>
                <MenuItem value={true}>Yes</MenuItem><MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className='flex gap-3'>
          <Button variant='outlined' onClick={() => navigate('/admin/restaurant/menu')}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={loading || uploadingImage || categories.length === 0 || (editing && !food)}>
            {loading ? 'Saving…' : editing ? 'Save changes' : 'Create item'}
          </Button>
        </div>
      </form>
    </div>
  )
}
