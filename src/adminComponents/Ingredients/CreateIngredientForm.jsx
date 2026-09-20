import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createIngredient, updateIngredient } from '../../State/Ingredients/Action'

export const CreateIngredientForm = ({ ingredient, onSaved }) => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const restaurantId = useSelector((store) => store.restaurant.usersRestaurant?.id)
  const ingredients = useSelector((store) => store.ingredients)
  const [formData, setFormData] = useState({
    name: ingredient?.name || '',
    categoryId: ingredient?.category?.id || '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!restaurantId) return
    const saved = ingredient
      ? await dispatch(updateIngredient({ id: ingredient.id, data: { ...formData, restaurantId }, jwt }))
      : await dispatch(createIngredient({ data: { ...formData, restaurantId }, jwt }))
    if (saved) onSaved?.()
  }

  return (
    <div className='p-2'>
      <h2 id='ingredient-form-title' className='pb-6 text-center text-xl font-semibold'>
        {ingredient ? 'Edit ingredient' : 'Create ingredient'}
      </h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth name='name' label='Name' value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id='ingredient-category-label'>Category</InputLabel>
            <Select
              labelId='ingredient-category-label' name='categoryId' label='Category'
              value={formData.categoryId}
              onChange={(event) => setFormData({ ...formData, categoryId: event.target.value })}
            >
              {ingredients.category.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button
            variant='contained' type='submit'
            disabled={!formData.name.trim() || !formData.categoryId || ingredients.loading}
          >
            {ingredient ? 'Save changes' : 'Create ingredient'}
          </Button>
        </Stack>
      </form>
    </div>
  )
}
