import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Formik, Form} from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../State/Authentication/Action'

const initialValues = {
  fullName: "",
  email : "",
  password: "",
  role: "ROLE_CUSTOMER"
}


const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({userData: values, navigate}))
  }
  
  return (
    <div>
      <Typography variant='h5' className=' text-center'>
        Register
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
         />
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
         />
          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Field
              as={Select}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              margin="normal"
            >
              <MenuItem value={'ROLE_CUSTOMER'}>Customer</MenuItem>
              <MenuItem value={'ROLE_RESTAURANT_OWNER'}>Restaurant Owner</MenuItem>
            
            </Field>
          </FormControl>
          <Button sx={{mt: 2, padding: "1rem"}} fullWidth type="submit" variant='contained'>Register</Button>
        </Form>
      </Formik>
      <Typography variant='body2' align='center'  sx={{mt: 3}}>
        If already have an account?
        <Button size='small' onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  )
}

export default RegisterForm
