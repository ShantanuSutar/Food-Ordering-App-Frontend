import { Add } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Card, CardContent, CardHeader, IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteIngredientCategory } from '../../State/Ingredients/Action'
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm'

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100% - 32px)', sm: 420 }, bgcolor: 'background.paper',
  borderRadius: 3, boxShadow: 24, p: 3,
}

export const IngredientsCategoryTable = () => {
  const [open, setOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const dispatch = useDispatch()
  const { category: categories, loading, error } = useSelector((store) => store.ingredients)
  const jwt = localStorage.getItem('jwt')

  const openForm = (category = null) => {
    setEditingCategory(category)
    setOpen(true)
  }

  const handleDelete = (category) => {
    if (window.confirm(`Delete ${category.name}? It must be empty first.`)) {
      dispatch(deleteIngredientCategory({ id: category.id, jwt }))
    }
  }

  return (
    <Box>
      <Card>
        <CardHeader title='Ingredient categories' action={<Button startIcon={<Add />} onClick={() => openForm()}>Add</Button>} />
        <CardContent className='space-y-2 !pt-0'>
          {error && <p className='rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300'>{error}</p>}
          {categories.length === 0 ? (
            <div className='rounded-xl border border-dashed border-slate-400/20 p-6 text-center text-gray-400'>No ingredient categories yet.</div>
          ) : categories.map((item) => (
            <div key={item.id} className='flex items-center justify-between gap-3 rounded-xl border border-slate-400/15 p-3'>
              <span className='truncate'>{item.name}</span>
              <div className='flex shrink-0'>
                <IconButton aria-label={`Edit ${item.name}`} disabled={loading} onClick={() => openForm(item)}><EditIcon /></IconButton>
                <IconButton color='error' aria-label={`Delete ${item.name}`} disabled={loading} onClick={() => handleDelete(item)}><DeleteIcon /></IconButton>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby='ingredient-category-form-title'>
        <Box sx={modalStyle}>
          <CreateIngredientCategoryForm
            key={editingCategory?.id || 'new'}
            category={editingCategory}
            onSaved={() => setOpen(false)}
          />
        </Box>
      </Modal>
    </Box>
  )
}
