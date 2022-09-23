import type { NextPage } from 'next'
import Link from 'next/link'
// Hooks
import { useBlogPost } from '../../../swr/hooks'
// Constants
import { PORTAL_BLOG_EDIT_URL, PORTAL_BLOG_NEW_URL } from '../../../constants/urls'
import Loader from '../../../components/ui/Loader'


interface BlogPost {
	id: number,
	user: number,
	title: string,
	content: string,
	publish_date: string,
	status: number,
}

const PortalBlogPage: NextPage = () => {
	const { data, isLoading } = useBlogPost()

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
							</div>
						))}
					</div>
				)
			}
		</div>
	)
}


export default PortalBlogPage
