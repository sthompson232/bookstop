import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogPostSchema } from '../../schema/blog'


export interface BlogPostFormTypes {
	title: string,
	content: string,
	futurePublishDate: boolean,
}

const useBlogPostForm = (defaultValues: BlogPostFormTypes) => {
	const formMeta = useForm<BlogPostFormTypes>({
		resolver: yupResolver(blogPostSchema),
		defaultValues: defaultValues
	})
	return formMeta
}

export default useBlogPostForm
