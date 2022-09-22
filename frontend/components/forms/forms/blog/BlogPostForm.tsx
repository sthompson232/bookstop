import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
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
import DatePicker from '../../fields/DatePicker'
// Constants
import { PORTAL_BLOG_CREATE_ENDPOINT, PORTAL_BLOG_URL } from '../../../../constants/urls'
// Utils
import { getRestAPIHeaders } from '../../../../utils/headers'
import { AlertContext } from '../../../alerts/AlertContextProvider'


interface PropTypes {
	defaultValues: BlogPostFormTypes,
}

const BlogPostForm = ({ defaultValues }: PropTypes) => {
	const { sendAlert } = useContext(AlertContext)
	const router = useRouter()
	const methods = useBlogPostForm(defaultValues)
	const [showPostPreview, setShowPostPreview] = useState(false)
	const enableFuturePublishDate = methods.watch('enableFuturePublishDate')

	useEffect(() => {
		if (!enableFuturePublishDate) {
			methods.setValue('publishDate', new Date().toISOString().split('T')[0])
		}
	}, [enableFuturePublishDate, methods])

	const submitForm = async (values: BlogPostFormTypes, saveType: string) => {
		const payload = {
			title: values.title,
			content: values.content,
			publish_date: values.publishDate,
			save_type: saveType,
		}
		const result = await fetch(PORTAL_BLOG_CREATE_ENDPOINT, {
			method: 'POST',
			headers: {
				...getRestAPIHeaders(),
			},
			body: JSON.stringify(payload)
		}).then(res => {
			if (res.ok) {
				router.push(PORTAL_BLOG_URL)
				sendAlert('success', `${values.title} - Post created`)
			} else {
				sendAlert('error', 'Error - Please try again later')
			}
		})
	}

	const renderPostPreview = () => {
		const [title, content, enableFuturePublishDate, publishDate] = methods.getValues(['title', 'content', 'enableFuturePublishDate', 'publishDate'])
		return (
			<ModalWrapper fullScreen setShowModal={setShowPostPreview}>
				<BlogPost
					title={title}
					content={content}
					publishDate={enableFuturePublishDate ? publishDate : new Date().toString()}
				/>
			</ModalWrapper>
		)
	}

	return methods && (
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
							<h3 className="pt-6 pb-2">Title</h3>
							<TextInput
								control={methods.control}
								autoFocus
								type="text"
								autoComplete="title"
								placeholder="Title"
								name="title"
								error={methods.formState.errors?.title}
							/>
							<h3 className="pt-6 pb-2">Browse images</h3>
							<ImageBrowser />
							<h3 className="pt-6 pb-2">Set a future publish date</h3>
							<Checkbox
								control={methods.control}
								name="enableFuturePublishDate"
							/>
							{enableFuturePublishDate &&
								<div className="flex justify-center pt-3">
									<DatePicker
										name="publishDate"
										control={methods.control}
										error={methods.formState.errors?.publishDate}
									/>
								</div>
							}
						</div>
						<div className="space-y-2 mt-6">
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
			{showPostPreview && renderPostPreview()}
		</FormProvider>
	)
}


export default BlogPostForm
