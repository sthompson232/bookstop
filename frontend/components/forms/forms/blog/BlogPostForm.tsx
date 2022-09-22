import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import Link from 'next/link'
// Hooks
import useBlogPostForm from '../../hooks/blog/use-blog-post-form'
import { BlogPostFormTypes } from '../../hooks/blog/use-blog-post-form'
// Local components
import ImageBrowser from '../../../images/ImageBrowser'
import TextEditor from '../../fields/TextEditor'
import TextInput from '../../fields/TextInput'
import Checkbox from '../../fields/Checkbox'
import Button from '../../../ui/Button'
import ModalWrapper from '../../../ui/ModalWrapper'
import BlogPost from '../../../blog/BlogPost'


const BlogPostForm = () => {
	const methods = useBlogPostForm()
	const [showPostPreview, setShowPostPreview] = useState(false)

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
								<p className="link-text">Back</p>
							</Link>
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
							<h3>Browse images</h3>
							<ImageBrowser />
						</div>
						<div className="space-y-2 mt-6">
							<p>Set a publish date</p>
							<Checkbox
								control={methods.control}
								name="custom-publish-date"
							/>
							<Button
								className="btn w-full"
								onClick={() => setShowPostPreview(true)}
							>
								Preview
							</Button>
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
			{showPostPreview &&
				<ModalWrapper fullScreen setShowModal={setShowPostPreview}>
					<BlogPost title={methods.getValues('title')} content={methods.getValues('content')} />
				</ModalWrapper>
			}
		</FormProvider>
	)
}


export default BlogPostForm
