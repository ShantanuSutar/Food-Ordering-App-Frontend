import { Button, TextField, Typography } from '@mui/material'
import { Field, Formik, Form} from 'formik'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../State/Authentication/Action'
import * as Yup from 'yup'
import { safeAuthReturnPath } from './authNavigation'

const initialValues = {
  email : "",
  password: ""
}
const schema = Yup.object({
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const returnTo = safeAuthReturnPath(location.state?.from)

  const handleSubmit = (values) => {
    return dispatch(loginUser({userData: values, navigate, returnTo}))
  }

  return (
    <div>
      <div className='mb-6 text-center'><span className='mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 font-black text-[var(--color-bg)]'>D</span>
      <Typography variant='h5' fontWeight={800}>
        Welcome back
      </Typography>
      <p className='mt-2 text-sm text-slate-400'>Sign in to continue to DineHub.</p></div>

      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ touched, errors, isSubmitting }) => <Form>
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
          <Button sx={{mt: 2}} fullWidth type="submit" variant='contained' disabled={isSubmitting}>Sign in</Button>
        </Form>}
      </Formik>
      <Typography variant='body2' align='center'  sx={{mt: 3}}>
        New to DineHub?
        <Button size='small' onClick={() => navigate("/account/register", { state: { from: returnTo } })}>
          Register
        </Button>
      </Typography>
    </div>
  )
}

export default LoginForm
