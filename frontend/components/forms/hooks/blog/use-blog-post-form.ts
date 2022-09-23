import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogPostSchema } from '../../schema/blog'
import { BlogPostType } from '../../../../constants/types/blog'


const useBlogPostForm = (defaultValues: BlogPostType) => {
	const formMeta = useForm<BlogPostType>({
		resolver: yupResolver(blogPostSchema),
		defaultValues
	})
	return formMeta
}

export default useBlogPostForm
