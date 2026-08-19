import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateIngredientForm = () => {

    const [formData, setFormData] = useState({ categoryName: "", ingredientCategoryId: "" })
    const handleSubmit = () => {
        const data = {
            name: formData.categoryName,
            restaurantId: {
                id: 1
            }
        }

        console.log(data)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    return (
        <div className=' p-5'>
            <h2 className=' text-gray-400 text-center text-xl   pb-10'>Create Ingredient Category</h2>
            <form onSubmit={handleSubmit}>

                <Stack spacing={3}>

                    <TextField
                        fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Cuisine Type"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.categoryName}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="category-label">
                            Category
                        </InputLabel>

                        <Select
                            labelId="category-label"
                            id="category"
                            value={formData.ingredientCategoryId}
                            label="Category"
                            onChange={handleInputChange}
                            name="ingredientCategoryId"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ alignSelf: "flex-start" }}
                    >
                        Create Category
                    </Button>

                </Stack>

            </form>
        </div>
    )
}
