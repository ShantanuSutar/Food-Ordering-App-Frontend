import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateFoodCategoryForm = () => {

    const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" })
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
            <h2 className=' text-gray-400 text-center text-xl   pb-10'>Create Category Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <TextField
                    fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Food Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.categoryName}
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
