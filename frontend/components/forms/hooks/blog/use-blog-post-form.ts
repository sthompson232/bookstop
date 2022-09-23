import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogPostSchema } from '../../schema/blog'


export interface BlogPostFormTypes {
	id?: number,
	user?: number,
	status?: number,
	title: string,
	content: string,
	publish_date: string,
}

const useBlogPostForm = (defaultValues: BlogPostFormTypes) => {
	const formMeta = useForm<BlogPostFormTypes>({
		resolver: yupResolver(blogPostSchema),
		defaultValues
	})
	return formMeta
}

export default useBlogPostForm
