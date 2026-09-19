import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from '../../State/Ingredients/Action';

export const CreateIngredientForm = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const {restaurant, ingredients} = useSelector(store => store)

    const [formData, setFormData] = useState({ 
        categoryName: "", 
        categoryId: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            restaurantId: restaurant.usersRestaurant.id
        }
        dispatch(createIngredient({data, jwt}))
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
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="category-label">
                            Category
                        </InputLabel>

                        <Select
                            labelId="category-label"
                            id="category"
                            value={formData.categoryId}
                            label="Category"
                            onChange={handleInputChange}
                            name="categoryId"
                        >
                            {ingredients?.category?.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ alignSelf: "flex-start" }}
                    >
                        Create Ingredient
                    </Button>

                </Stack>

            </form>
        </div>
    )
}
