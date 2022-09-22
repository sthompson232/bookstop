import * as yup from 'yup'
import { REQUIRED, GENERIC_MAX } from '../../../constants/error-messages'


export const blogPostDefaultValues = {
	title: '',
	content: '',
	enableFuturePublishDate: false,
	publishDate: new Date().toISOString().split('T')[0],
}

export const blogPostSchema = yup.object().shape({
  title: yup.string().max(200, GENERIC_MAX(200)).required(REQUIRED),
  content: yup.string().required(REQUIRED),
	enableFuturePublishDate: yup.bool(),
	publishDate: yup.string().required(REQUIRED),
})
