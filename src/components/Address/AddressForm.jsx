import { Button, Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { addressValidationSchema } from './addressFormConfig'

const addressFields = [
  ['fullName', 'Full Name'],
  ['streetAddress', 'Street Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['postalCode', 'Postal Code'],
  ['country', 'Country'],
]

const AddressForm = ({
  initialValues,
  onSubmit,
  submitLabel = 'Save address',
  loading = false,
  onCancel,
}) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    validationSchema={addressValidationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched, isSubmitting }) => (
      <Form>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {addressFields.map(([name, label]) => (
            <Grid key={name} size={{ xs: 12, sm: name === 'city' || name === 'state' ? 6 : 12 }}>
              <Field
                as={TextField}
                name={name}
                label={label}
                fullWidth
                variant='outlined'
                error={Boolean(touched[name] && errors[name])}
                helperText={touched[name] && errors[name]}
              />
            </Grid>
          ))}
          <Grid size={12}>
            <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              {onCancel && (
                <Button type='button' variant='text' onClick={onCancel} disabled={isSubmitting || loading}>
                  Cancel
                </Button>
              )}
              <Button variant='contained' type='submit' disabled={isSubmitting || loading}>
                {submitLabel}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
)

export default AddressForm
