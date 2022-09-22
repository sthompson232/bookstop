import type { NextPage, GetServerSideProps } from 'next'
// Local components
import BlogPostForm from '../../../components/forms/forms/blog/BlogPostForm'
// Constants
import { blogPostDefaultValues } from '../../../components/forms/schema/blog'
import { BlogPostFormTypes } from '../../../components/forms/hooks/blog/use-blog-post-form'


const BlogNewPage: NextPage<{ defaultValues: BlogPostFormTypes }> = ({ defaultValues }) => {
	return (
		<BlogPostForm defaultValues={defaultValues} editing={false} />
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			defaultValues: blogPostDefaultValues,
		}
	}
}

export default BlogNewPage
