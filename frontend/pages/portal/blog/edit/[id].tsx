import type { NextPage, GetServerSideProps } from 'next'
// Local components
import BlogPostForm from '../../../../components/forms/forms/blog/BlogPostForm'
// Constants
import { PORTAL_BLOG_RETRIEVE_ENDPOINT } from '../../../../constants/urls'
import { BlogPostType } from '../../../../constants/types/blog'


interface PropTypes {
	defaultValues: BlogPostType,
	blogPostId: number,
}

const PortalBlogPostEdit: NextPage<PropTypes> = ({ blogPostId, defaultValues }) => {
	return (
		<BlogPostForm
			defaultValues={defaultValues}
			editing
			blogPostId={blogPostId}
		/>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const blogPostId = context?.params?.id
	let defaultValues
	if (typeof blogPostId === 'string') {
		defaultValues = await fetch(`${PORTAL_BLOG_RETRIEVE_ENDPOINT.replace('$(id)', blogPostId)}`, {
			method: 'GET',
			headers: {
				'Authorization': `Token ${context.req.cookies.token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		}).then(res => res.json())
	}

	return {
		props: {
			defaultValues,
			blogPostId,
		}
	}
}


export default PortalBlogPostEdit
