import { useContext } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
// Hooks
import { useBlogPost } from '../../../swr/hooks'
// Context
import { AlertContext } from '../../../components/alerts/AlertContextProvider'
// Constants
import { PORTAL_BLOG_DELETE_ENDPOINT, PORTAL_BLOG_EDIT_URL, PORTAL_BLOG_NEW_URL } from '../../../constants/urls'
import Loader from '../../../components/ui/Loader'
import { getRestAPIHeaders } from '../../../utils/headers'
import { GENERIC_ERROR_MESSAGE } from '../../../constants/error-messages'


interface BlogPost {
	id: number,
	user: number,
	title: string,
	content: string,
	publish_date: string,
	status: number,
}

const PortalBlogPage: NextPage = () => {
	const { data, isLoading, mutate } = useBlogPost()
	const { sendAlert } = useContext(AlertContext)

	const deletePost = async (post: BlogPost) => {
		const result = await fetch(`${PORTAL_BLOG_DELETE_ENDPOINT.replace('$(id)', post.id.toString())}/`, {
			method: 'DELETE',
			headers: {
				...getRestAPIHeaders(),
			}
		})
		if (result.ok) {
			sendAlert('success', `${post.title} - Post deleted`)
			mutate()
		} else {
			sendAlert('error', GENERIC_ERROR_MESSAGE)
		}
	}

	return (
		<div className="container">
			<Link href={PORTAL_BLOG_NEW_URL} passHref>New post</Link>
			{isLoading 
				? (
					<div className="flex justify-center items-center">
						<Loader width={48} height={48} />
					</div>
				) : (
					<div>
						{data && data.results.map((post: BlogPost) => (
							<div key={post.id}>
								<Link href={PORTAL_BLOG_EDIT_URL.replace('$(id)', post.id.toString())}>
									{post.title}
								</Link>
								<div className="link-action" onClick={() => {deletePost(post)}}>
									Delete
								</div>
							</div>
						))}
					</div>
				)
			}
		</div>
	)
}


export default PortalBlogPage
