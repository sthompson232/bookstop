import * as yup from 'yup'
import { REQUIRED } from '../../../constants/error-messages'


export const blogPostSchema = yup.object().shape({
  title: yup.string().required(REQUIRED),
  content: yup.string().required(REQUIRED),
})
