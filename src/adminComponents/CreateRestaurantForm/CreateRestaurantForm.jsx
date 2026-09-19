import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';

import { useFormik } from 'formik'
import { useState } from 'react'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../State/Restaurant/Action';
import { notifyError } from '../../components/util/toast';

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
  images: []
}

export const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          fullName: values.name,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram
        },
        openingHours: values.openingHours,
        images: values.images
      }
      dispatch(createRestaurant({data, token: jwt}))
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
        setUploadImage(true);

        const image = await uploadImageToCloudinary(file);

        formik.setFieldValue("images", [
            ...formik.values.images,
            image
        ]);
    } catch (error) {
        notifyError(error, "Could not upload image", "restaurant-image-upload");
    } finally {
        setUploadImage(false);
    }
};

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images]
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages)
  }

  return (
    <div className=' py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className=' lg:max-w-4xl'>
        <h1 className=' font-bold text-2xl text-center py-2'>
          Add new restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className=' space-y-4'>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12 }}>
              <div className="flex flex-wrap gap-4">

                {/* Upload button */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  <label htmlFor="fileInput">
                    <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                      <AddPhotoAlternate className="text-white" />
                    </span>

                    {uploadImage && (
                      <div className="absolute inset-0 w-24 h-24 flex items-center justify-center">
                        <CircularProgress />
                      </div>
                    )}
                  </label>
                </div>

                {/* Images */}
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      className="w-24 h-24 object-cover rounded-md"
                      src={image}
                      alt=""
                    />

                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField fullWidth id='name' name='name' label="Name" variant='outlined' onChange={formik.handleChange} value={formik.values.name} />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField fullWidth id='description' name='description' label="Description" variant='outlined' onChange={formik.handleChange} value={formik.values.description} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='cuisineType' name='cuisineType' label="CuisineType" variant='outlined' onChange={formik.handleChange} value={formik.values.cuisineType} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='openingHours' name='openingHours' label="Opening Hours" variant='outlined' onChange={formik.handleChange} value={formik.values.openingHours} />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField fullWidth id='streetAddress' name='streetAddress' label="Street Address" variant='outlined' onChange={formik.handleChange} value={formik.values.streetAddress} />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField fullWidth id='city' name='city' label="City" variant='outlined' onChange={formik.handleChange} value={formik.values.city} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 4 }}>
              <TextField fullWidth id='state' name='state' label="State" variant='outlined' onChange={formik.handleChange} value={formik.values.state} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 4 }}>
              <TextField fullWidth id='postalCode' name='postalCode' label="Postal Code" variant='outlined' onChange={formik.handleChange} value={formik.values.postalCode} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 4 }}>
              <TextField fullWidth id='country' name='country' label="Country" variant='outlined' onChange={formik.handleChange} value={formik.values.country} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='email' name='email' label="Email" variant='outlined' onChange={formik.handleChange} value={formik.values.email} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='mobile' name='mobile' label="Mobile" variant='outlined' onChange={formik.handleChange} value={formik.values.mobile} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='instagram' name='instagram' label="Instagram" variant='outlined' onChange={formik.handleChange} value={formik.values.instagram} />
            </Grid>
            <Grid item size={{ xs: 12, lg: 6 }}>
              <TextField fullWidth id='twitter' name='twitter' label="Twitter" variant='outlined' onChange={formik.handleChange} value={formik.values.twitter} />
            </Grid>
          </Grid>
          <Button className='' variant='contained' color='primary' type='submit'>Create Restaurant</Button>
        </form>
      </div>
    </div>
  )
}
