import * as yup from 'yup'
import { REQUIRED, VALID_EMAIL } from '../../../constants/error-messages'


export const loginSchema = yup.object().shape({
	email: yup.string().email(VALID_EMAIL).required(REQUIRED),
	password: yup.string().required(REQUIRED)
})
