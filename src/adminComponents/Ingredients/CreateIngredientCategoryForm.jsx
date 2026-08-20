import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../State/Ingredients/Action';

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const {restaurant} = useSelector(store => store)

    const [formData, setFormData] = useState({ name: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            restaurantId: restaurant.usersRestaurant.id
        }
        dispatch(createIngredientCategory({data, jwt}))
        console.log(formData)
    }
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    return (
        <div className=' p-5'>
            <h2 className=' text-gray-400 text-center text-xl   pb-10'>Create Food Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                />

                <div className="pt-4">
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Create Category
                    </Button>
                </div>

            </form>
        </div>
    )
}
