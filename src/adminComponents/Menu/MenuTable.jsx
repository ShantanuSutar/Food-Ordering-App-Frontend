import { Avatar, Box, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from "@mui/icons-material/Create"
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../State/Menu/Action'

export const MenuTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredients, menu } = useSelector(store => store)

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId, jwt}))
  }

  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: restaurant.usersRestaurantId.id,
      vegetarian: false,
      nonveg: false,
      seasonal: false,
      foodCategory: ""
    }))
  }, [])

  return (
    <Box>
      <Card className=' mt-1'>
        <CardHeader action={
          <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        } title={"Menu"} sx={{ paddingTop: 2, alignItems: "center" }} />
        <CardActions />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>

                  </TableCell>
                  <TableCell align="left">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    {item.ingredients.map((ingredient) => <Chip label={ingredient.name} />)}
                  </TableCell>
                  <TableCell align="right">₹{item.price}</TableCell>
                  <TableCell align="right">{item.available ? "In stock" : "Out of stock"}</TableCell>
                  <TableCell align="right">
                    <IconButton color='primary' onClick={() => handleDeleteFood(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
