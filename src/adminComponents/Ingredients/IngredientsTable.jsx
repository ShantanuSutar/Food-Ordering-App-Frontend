import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CreateIcon from "@mui/icons-material/Create"
import { Delete } from '@mui/icons-material'
import { CreateFoodCategoryForm } from '../FoodCategory/CreateFoodCategoryForm'
import { CreateIngredientForm } from './CreateIngredientForm'
import { useDispatch, useSelector } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const orders = [1, 1, 1, 1]

export const IngredientsTable = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {restaurant, ingredients} = useSelector(store => store)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card className=' mt-1'>
        <CardHeader action={
          <IconButton onClick={handleOpen} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        } title={"Ingredients"} sx={{ paddingTop: 2, alignItems: "center" }} />
        <CardActions />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {1}
                  </TableCell>
                  <TableCell align="left">{"name"}</TableCell>
                  <TableCell align="left">{"category"}</TableCell>
                  <TableCell align="right">{"available"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm/>
        </Box>
      </Modal>
    </Box>
  )
}
