import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogPostSchema } from '../../schema/blog'


export interface BlogPostFormTypes {
	title: string,
	content: string,
}

const useBlogPostForm = () => {
	const formMeta = useForm<BlogPostFormTypes>({
		resolver: yupResolver(blogPostSchema)
	})
	return formMeta
}

export default useBlogPostForm
