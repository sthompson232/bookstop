import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import Link from 'next/link'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'
// Hooks
import useBlogPostForm from '../../hooks/blog/use-blog-post-form'
import { BlogPostFormTypes } from '../../hooks/blog/use-blog-post-form'
// Local components
import { AlertContext } from '../../../alerts/AlertContextProvider'
import ImageBrowser from '../../../images/ImageBrowser'
import TextEditor from '../../fields/TextEditor'
import TextInput from '../../fields/TextInput'
import Button from '../../../ui/Button'
import ModalWrapper from '../../../ui/ModalWrapper'
import BlogPost from '../../../blog/BlogPost'
import DatePicker from '../../fields/DatePicker'
// Constants
import { PORTAL_BLOG_CREATE_ENDPOINT, PORTAL_BLOG_UPDATE_ENDPOINT, PORTAL_BLOG_URL } from '../../../../constants/urls'
import { BLOG_DRAFT } from '../../../../constants/blog'
import { GENERIC_ERROR_MESSAGE } from '../../../../constants/error-messages'
// Utils
import { getRestAPIHeaders } from '../../../../utils/headers'


interface PropTypes {
	blogPostId?: number,
	defaultValues: BlogPostFormTypes,
	editing: boolean,
}

const BlogPostForm = ({ blogPostId, defaultValues, editing }: PropTypes) => {
	const { sendAlert } = useContext(AlertContext)
	const router = useRouter()
	const methods = useBlogPostForm(defaultValues)
	const [showPostPreview, setShowPostPreview] = useState(false)
	const [showPostSettings, setShowPostSettings] = useState(false)

	const submitForm = async (values: BlogPostFormTypes, saveType: string) => {
		const payload = {
			title: values.title,
			content: values.content,
			publish_date: values.publish_date,
			save_type: saveType,
		}
		if (editing && blogPostId) {
			await fetch(`${PORTAL_BLOG_UPDATE_ENDPOINT.replace('$(id)', blogPostId.toString())}/`, {
				method: 'PUT',
				headers: {
					...getRestAPIHeaders(),
				},
				body: JSON.stringify(payload)
			}).then(res => {
				if (res.ok) {
					router.push(PORTAL_BLOG_URL)
					sendAlert('success', `${values.title} - Post updated`)
				} else {
					sendAlert('error', GENERIC_ERROR_MESSAGE)
				}
			})
		} else {
			await fetch(PORTAL_BLOG_CREATE_ENDPOINT, {
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
					sendAlert('error', GENERIC_ERROR_MESSAGE)
				}
			})
		}
	}

	const renderPostPreview = () => {
		const [title, content, publishDate] = methods.getValues(['title', 'content', 'publish_date'])
		return (
			<ModalWrapper fullScreen setShowModal={setShowPostPreview}>
				<BlogPost
					title={title}
					content={content}
					publishDate={publishDate}
				/>
			</ModalWrapper>
		)
	}

	const renderShowPostSettings = () => {
		return (
			<ModalWrapper setShowModal={setShowPostSettings}>
				<div className="flex justify-center">
					<div>
						<h3 className="pb-2">Publish date</h3>
						<DatePicker
							name="publish_date"
							control={methods.control}
							error={methods.formState.errors?.publish_date}
						/>
					</div>
				</div>
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
							<div className="flex justify-between items-center">
								<Link href={PORTAL_BLOG_URL} passHref>
									<p className="link-text">Back</p>
								</Link>
								{editing
									? (
										<span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-0.5 text-sm font-medium text-accent pointer-events-none">
											Editing
										</span>
									) : (
										<span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-0.5 text-sm font-medium text-accent pointer-events-none">
											New
										</span>
									)
								}
							</div>
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
						</div>
						<div className="space-y-2 mt-6">
							<div
								className="flex items-center"
							>
								<div
									className="flex items-center group hover:bg-gray-100 py-1 px-2 transition-all cursor-pointer rounded-lg"
									onClick={() => setShowPostSettings(true)}
								>
									<Cog6ToothIcon
										className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-all"
									/>
									<p className="pl-2 text-gray-500 group-hover:text-gray-600 transition-all">Settings</p>
								</div>
							</div>
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
								{editing && defaultValues.status !== BLOG_DRAFT ? 'Move to drafts' : 'Save as draft'}
							</Button>
							<Button
								className="btn w-full"
								onClick={methods.handleSubmit(data => submitForm(data, 'publish'))}
							>
								{editing && defaultValues.status !== BLOG_DRAFT ? 'Update' : 'Publish'}
							</Button>
						</div>
					</div>
				</div>
			</form>
			{showPostPreview && renderPostPreview()}
			{showPostSettings && renderShowPostSettings()}
		</FormProvider>
	)
}


export default BlogPostForm
