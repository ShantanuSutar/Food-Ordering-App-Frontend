import { Box, Button, Chip, CircularProgress, FormControl, formControlClasses, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';

import { useFormik } from 'formik'
import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';

const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: []
}



export const CreateMenuForm = () => {
    const [uploadImage, setUploadImage] = useState(false)
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            values.restaurantId = 2
            console.log("data ", values)
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
            console.error("Image upload failed:", error);
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
                    Add new Menu
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
                            <TextField fullWidth id='price' name='price' label="Price" variant='outlined' onChange={formik.handleChange} value={formik.values.price} />
                        </Grid>
                        <Grid item size={{ xs: 12, lg: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    value={formik.values.category}
                                    label="Category"
                                    onChange={formik.handleChange}
                                    name='category'
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="ingredients">Ingredients</InputLabel>
                                <Select
                                    labelId="ingredients"
                                    id="ingredients"
                                    name="ingredients"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                // MenuProps={MenuProps}
                                >
                                    {["bread", "sauce", "chutney"].map((name, index) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 12, lg: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="seasonal"
                                    value={formik.values.seasonal}
                                    label="Seasonal"
                                    onChange={formik.handleChange}
                                    name='seasonal'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 12, lg: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="vegetarian"
                                    value={formik.values.vegetarian}
                                    label="Vegetarian"
                                    onChange={formik.handleChange}
                                    name='vegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                    </Grid>
                    <Button className='' variant='contained' color='primary' type='submit'>Create Menu</Button>
                </form>
            </div>
        </div>
    )
}
