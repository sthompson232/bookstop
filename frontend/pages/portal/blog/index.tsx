import type { NextPage } from 'next'
import Link from 'next/link'
// Constants
import { PORTAL_BLOG_NEW_URL } from '../../../constants/urls'


const PortalBlogPage: NextPage = () => (
	<div className="container">
		<Link href={PORTAL_BLOG_NEW_URL} passHref>New post</Link>
	</div>
)


export default PortalBlogPage
