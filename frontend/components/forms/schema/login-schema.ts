import * as yup from 'yup'


export const loginSchema = yup.object().shape({
	email: yup.string().email('Please enter a valid email address').required('This field is required'),
	password: yup.string().required('This field is required')
})
