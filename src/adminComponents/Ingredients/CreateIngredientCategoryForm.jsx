import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createIngredientCategory, updateIngredientCategory } from '../../State/Ingredients/Action'

export const CreateIngredientCategoryForm = ({ category, onSaved }) => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const restaurantId = useSelector((store) => store.restaurant.usersRestaurant?.id)
  const loading = useSelector((store) => store.ingredients.loading)
  const [name, setName] = useState(category?.name || '')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!restaurantId || !name.trim()) return
    const saved = category
      ? await dispatch(updateIngredientCategory({ id: category.id, name: name.trim(), jwt }))
      : await dispatch(createIngredientCategory({ data: { name: name.trim(), restaurantId }, jwt }))
    if (saved) onSaved?.()
  }

  return (
    <div className='p-2'>
      <h2 id='ingredient-category-form-title' className='pb-6 text-center text-xl font-semibold'>
        {category ? 'Edit ingredient category' : 'Create ingredient category'}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextField fullWidth name='name' label='Category name' value={name} onChange={(event) => setName(event.target.value)} />
        <Button fullWidth variant='contained' type='submit' disabled={!name.trim() || loading}>
          {category ? 'Save changes' : 'Create category'}
        </Button>
      </form>
    </div>
  )
}
