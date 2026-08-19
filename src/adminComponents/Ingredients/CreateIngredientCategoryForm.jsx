import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateIngredientCategoryForm = () => {

    const [formData, setFormData] = useState({ name: "" })
    const handleSubmit = () => {
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
