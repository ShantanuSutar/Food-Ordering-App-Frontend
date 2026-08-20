import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../State/Restaurant Order/Action';

const orders = [1, 1, 1, 1]


const orderStatus = [
  {label: "Pending", value: "PENDING"},
  {label: "Completed", value: "COMPLETED"},
  {label: "All", value: "ALL"},
]

export const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredients, menu, restaurantOrder } = useSelector(store => store)

  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurantId?.id
    }))
  }, [])

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({orderId, orders, jwt}))
    handleClose();
  }

  return (
    <Box>
      <Card className=' mt-1'>
        <CardHeader title={"All Orders"} sx={{ paddingTop: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder?.orders?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => <Avatar src={orderItem.food?.images[0]} />)}

                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">{item.totalAmount}</TableCell>
                  <TableCell align="right">{item.items.map((orderItem) => <p>{orderItem.food?.name}</p>)}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => <div>
                      {orderItem.ingredients.map((ingredient) => <Chip label={ingredient} />)}
                    </div>)}</TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id={buttonId}
                      aria-controls={open ? menuId : undefined}
                      aria-haspopup="true"
                      aria-expanded={open}
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                    <Menu
                      id={menuId}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          'aria-labelledby': buttonId,
                        },
                      }}
                    >
                     {orderStatus.map((status) => <MenuItem onClick={() => handleUpdateOrder(item.id, status.value)}>{status.label}</MenuItem>)} 
                    </Menu>
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
