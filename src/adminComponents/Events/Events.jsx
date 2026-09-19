import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../State/Restaurant/Action';

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



export const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { restaurant } = useSelector(store => store)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    image: "",
    location: "",
    name: "",
    startedAt: null,
    endsAt: null
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formValues,
      startedAt: formValues.startedAt
        ? formValues.startedAt.format("MMMM D, YYYY hh:mm A")
        : null,
      endsAt: formValues.endsAt
        ? formValues.endsAt.format("MMMM D, YYYY hh:mm A")
        : null
    };

    dispatch(createEventAction({reqData: data, restaurantId: restaurant.usersRestaurant?.id, jwt}))

  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date, dateType) => {
    setFormValues(prev => ({
      ...prev,
      [dateType]: date
    }));
  };

  return (
    <div>
      <div className=' p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create new Event
        </Button>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <div className="flex flex-col gap-4">

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Start Date and Time"
                        value={formValues.startedAt}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "startedAt")
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="End Date and Time"
                        value={formValues.endsAt}
                        onChange={(newValue) =>
                          handleDateChange(newValue, "endsAt")
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
              </Grid>

              <div className="pt-4">
                <Button
                  variant="contained"
                  type="submit"
                >
                  Create Event
                </Button>
              </div>
            </form>
          </Box>
        </Modal>

      </div>
    </div>
  )
}
