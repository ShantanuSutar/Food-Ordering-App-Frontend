import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Formik, Form} from 'formik'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../../State/Authentication/Action'
import * as Yup from 'yup'
import { safeAuthReturnPath } from './authNavigation'

const initialValues = {
  fullName: "",
  email : "",
  password: "",
  role: "ROLE_CUSTOMER"
}
const schema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Enter your full name').required('Full name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Use at least 6 characters').required('Password is required'),
  role: Yup.string().required('Choose an account type'),
})


const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const returnTo = safeAuthReturnPath(location.state?.from)

  const handleSubmit = (values) => {
    return dispatch(registerUser({userData: values, navigate, returnTo}))
  }
  
  return (
    <div>
      <div className='mb-5 text-center'><span className='mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 font-black text-[var(--color-bg)]'>D</span>
      <Typography variant='h5' fontWeight={800}>
        Create your account
      </Typography>
      <p className='mt-2 text-sm text-slate-400'>Join DineHub as a customer or restaurant owner.</p></div>

      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ touched, errors, isSubmitting }) => <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
            error={Boolean(touched.fullName && errors.fullName)}
            helperText={touched.fullName && errors.fullName}
         />
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
         />
          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel id="account-role-label">Account type</InputLabel>
            <Field
              as={Select}
              fullWidth
              labelId="account-role-label"
              label='Account type'
              name="role"
              margin="normal"
            >
              <MenuItem value={'ROLE_CUSTOMER'}>Customer</MenuItem>
              <MenuItem value={'ROLE_RESTAURANT_OWNER'}>Restaurant Owner</MenuItem>
            
            </Field>
          </FormControl>
          <Button sx={{mt: 2}} fullWidth type="submit" variant='contained' disabled={isSubmitting}>Create account</Button>
        </Form>}
      </Formik>
      <Typography variant='body2' align='center'  sx={{mt: 3}}>
        Already have an account?
        <Button size='small' onClick={() => navigate("/account/login", { state: { from: returnTo } })}>
          Login
        </Button>
      </Typography>
    </div>
  )
}

export default RegisterForm
