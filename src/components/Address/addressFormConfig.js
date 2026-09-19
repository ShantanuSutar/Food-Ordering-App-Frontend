import * as Yup from 'yup'

export const addressValidationSchema = Yup.object({
  fullName: Yup.string().trim().required('Full name is required'),
  streetAddress: Yup.string().trim().required('Street address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  postalCode: Yup.string()
    .trim()
    .min(3, 'Postal code is too short')
    .max(12, 'Postal code is too long')
    .required('Postal code is required'),
  country: Yup.string().trim().required('Country is required'),
})

export const addressInitialValues = (address, defaultFullName = '') => ({
  fullName: address?.fullName || defaultFullName,
  streetAddress: address?.streetAddress || '',
  city: address?.city || '',
  state: address?.state || '',
  postalCode: address?.postalCode || '',
  country: address?.country || 'India',
})
