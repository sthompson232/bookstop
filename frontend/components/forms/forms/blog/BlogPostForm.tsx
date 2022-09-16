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

	const submitForm = (values: BlogPostFormTypes, saveType: string) => {
		console.log(values, saveType)
	}

	return (
		<FormProvider {...methods}>
			<form className="h-full">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
					<div className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3">
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
							<h2>New post</h2>
							<h3>Title</h3>
							<TextInput
								control={methods.control}
								autoFocus
								type="text"
								autoComplete="title"
								id="title"
								placeholder="Title"
								name="title"
								error={methods.formState.errors?.title}
							/>
							<h3>Publish date</h3>
							<h3>Upload photos</h3>
						</div>
						<div className="space-y-2 mt-6">
							<Button 
								className="btn-secondary w-full"
								onClick={methods.handleSubmit(data => submitForm(data, 'draft'))}
							>
								Save as Draft
							</Button>
							<Button
								className="btn w-full"
								onClick={methods.handleSubmit(data => submitForm(data, 'publish'))}
							>
								Publish
							</Button>
						</div>
					</div>
				</div>
			</form>
		</FormProvider>
	)
}


export default BlogPostForm
