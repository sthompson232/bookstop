import type { NextPage, GetServerSideProps } from 'next'
// Local components
import BlogPostForm from '../../../../components/forms/forms/blog/BlogPostForm'
import { BlogPostFormTypes } from '../../../../components/forms/hooks/blog/use-blog-post-form'
// Constants
import { PORTAL_BLOG_RETRIEVE_ENDPOINT } from '../../../../constants/urls'


interface BlogPost {
	id: number,
	user: number,
	title: string,
	content: string,
	publish_date: string,
}

interface PropTypes {
	defaultValues: BlogPost
}

const PortalBlogPostEdit: NextPage<PropTypes> = ({ defaultValues }: PropTypes) => {
	console.log(defaultValues)
	return (
		<BlogPostForm defaultValues={defaultValues} editing />
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const result = await fetch(`${PORTAL_BLOG_RETRIEVE_ENDPOINT.replace('$(id)', context.params.id)}`, {
		method: 'GET',
		headers: {
			'Authorization': `Token ${context.req.cookies.token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	}).then(res => res.json())

	return {
		props: {
			defaultValues: result,
		}
	}
}


export default PortalBlogPostEdit
