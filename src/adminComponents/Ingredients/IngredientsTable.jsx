import { Add } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Alert, Box, Button, Card, CardContent, CardHeader, CircularProgress, IconButton, Modal, Switch } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteIngredient, updateStockOfIngredient } from '../../State/Ingredients/Action'
import { CreateIngredientForm } from './CreateIngredientForm'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100% - 32px)', sm: 460 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
}

export const IngredientsTable = () => {
  const [open, setOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { ingredients, loading, error } = useSelector((store) => store.ingredients)

  const openForm = (ingredient = null) => {
    setEditingIngredient(ingredient)
    setOpen(true)
  }

  const handleDelete = (ingredient) => {
    if (window.confirm(`Delete ${ingredient.name}? Ingredients used by menu items cannot be deleted.`)) {
      dispatch(deleteIngredient({ id: ingredient.id, jwt }))
    }
  }

  return (
    <Box>
      <Card>
        <CardHeader
          title='Ingredients'
          action={<Button startIcon={<Add />} onClick={() => openForm()}>Add</Button>}
        />
        <CardContent className='space-y-3 !pt-0'>
          {error && <Alert severity='error'>{error}</Alert>}
          {loading && ingredients.length === 0 ? (
            <div className='flex min-h-40 items-center justify-center'><CircularProgress /></div>
          ) : ingredients.length === 0 ? (
            <div className='rounded-xl border border-dashed border-slate-400/20 p-6 text-center text-gray-400'>
              No ingredients created yet.
            </div>
          ) : ingredients.map((item) => (
            <div key={item.id} className='flex items-center justify-between gap-3 rounded-xl border border-slate-400/15 p-3'>
              <div className='min-w-0'>
                <p className='truncate font-medium'>{item.name}</p>
                <p className='text-sm text-gray-400'>{item.category?.name || 'Uncategorised'}</p>
              </div>
              <div className='flex items-center gap-2'>
                <span className='hidden text-sm text-gray-400 sm:inline'>{item.inStock ? 'In stock' : 'Out of stock'}</span>
                <Switch
                  checked={Boolean(item.inStock)}
                  disabled={loading}
                  inputProps={{ 'aria-label': `Toggle ${item.name} stock` }}
                  onChange={() => dispatch(updateStockOfIngredient({ id: item.id, jwt }))}
                />
                <IconButton aria-label={`Edit ${item.name}`} disabled={loading} onClick={() => openForm(item)}><EditIcon /></IconButton>
                <IconButton color='error' aria-label={`Delete ${item.name}`} disabled={loading} onClick={() => handleDelete(item)}><DeleteIcon /></IconButton>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby='ingredient-form-title'>
        <Box sx={modalStyle}>
          <CreateIngredientForm
            key={editingIngredient?.id || 'new'}
            ingredient={editingIngredient}
            onSaved={() => setOpen(false)}
          />
        </Box>
      </Modal>
    </Box>
  )
}
