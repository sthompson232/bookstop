import * as yup from 'yup'
import { REQUIRED, GENERIC_MAX } from '../../../constants/error-messages'


export const blogPostSchema = yup.object().shape({
  title: yup.string().max(200, GENERIC_MAX(200)).required(REQUIRED),
  content: yup.string().required(REQUIRED),
})
