import { Grid } from '@mui/material'
import { IngredientsTable } from './IngredientsTable'
import { IngredientsCategoryTable } from './IngredientsCategoryTable'

export const Ingredients = () => {
  return (
    <div className='min-w-0'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <IngredientsTable />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <IngredientsCategoryTable />
        </Grid>
      </Grid>
    </div>
  )
}
