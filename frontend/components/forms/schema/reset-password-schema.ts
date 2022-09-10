import * as yup from 'yup'
import { REQUIRED, PASSWORD_MIN, PASSWORD_MATCH } from '../../../constants/error-messages'


export const resetPasswordSchema = yup.object().shape({
  password1: yup.string().required(REQUIRED).min(8, PASSWORD_MIN),
  password2: yup.string().required(REQUIRED).min(8, PASSWORD_MIN).oneOf([yup.ref('password1')], PASSWORD_MATCH)
})
