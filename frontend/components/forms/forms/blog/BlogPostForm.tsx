import { FormProvider } from 'react-hook-form'
// Hooks
import useBlogPostForm from '../../hooks/blog/use-blog-post-form'
import { BlogPostFormTypes } from '../../hooks/blog/use-blog-post-form'
// Local components
import TextEditor from '../../fields/TextEditor'
import TextInput from '../../fields/TextInput'
import Button from '../../../ui/Button'


const BlogPostForm = () => {
	const methods = useBlogPostForm()

	const submitForm = (values: BlogPostFormTypes) => {
		console.log(values)
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(submitForm)}>
				<TextInput
					control={methods.control}
					autoFocus
					type="text"
					autoComplete="title"
					id="title"
					placeholder="Title"
					name="title"
				/>
				<TextEditor
					control={methods.control}
					name="content"
					error={methods.formState.errors?.content}
				/>
				<Button type="submit">
					Submit
				</Button>
			</form>
		</FormProvider>
	)
}


export default BlogPostForm
