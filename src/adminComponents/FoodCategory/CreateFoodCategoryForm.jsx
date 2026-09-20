import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createCategoryAction, updateCategoryAction } from '../../State/Restaurant/Action'

export const CreateFoodCategoryForm = ({ category, onSaved }) => {
  const [name, setName] = useState(category?.name || '')
  const dispatch = useDispatch()
  const loading = useSelector((store) => store.restaurant.loading)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim()) return
    const jwt = localStorage.getItem('jwt')
    const saved = category
      ? await dispatch(updateCategoryAction({ categoryId: category.id, name: name.trim(), jwt }))
      : await dispatch(createCategoryAction({ reqData: { name: name.trim() }, jwt }))
    if (saved) onSaved?.()
  }

  return (
    <div className='p-2'>
      <h2 id='food-category-form-title' className='pb-6 text-center text-xl font-semibold'>
        {category ? 'Edit food category' : 'Create food category'}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextField fullWidth name='categoryName' label='Category name' value={name} onChange={(event) => setName(event.target.value)} />
        <Button fullWidth variant='contained' type='submit' disabled={!name.trim() || loading}>
          {category ? 'Save changes' : 'Create category'}
        </Button>
      </form>
    </div>
  )
}
