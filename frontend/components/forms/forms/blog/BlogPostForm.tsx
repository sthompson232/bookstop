import { FormProvider } from 'react-hook-form'
import Link from 'next/link'
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
			<form className="h-full" onSubmit={methods.handleSubmit(submitForm)}>
				<div className="grid grid-cols-4 h-full">
					<div className="col-span-3">
						<TextEditor
							control={methods.control}
							name="content"
							error={methods.formState.errors?.content}
						/>
					</div>
					<div className="col-span-1 flex flex-col justify-between shadow p-4">
						<div>
							<Link href="/" passHref>
								Back
							</Link>
							<h2>New blog post</h2>
							<TextInput
								control={methods.control}
								autoFocus
								type="text"
								autoComplete="title"
								id="title"
								placeholder="Title"
								name="title"
							/>
						</div>
						<Button type="submit">
							Submit
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	)
}


export default BlogPostForm
