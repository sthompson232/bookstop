import type { NextPage, GetServerSideProps } from 'next'
// Local components
import BlogPostForm from '../../../components/forms/forms/blog/BlogPostForm'
// Constants
import { blogPostDefaultValues } from '../../../components/forms/schema/blog'
import { BlogPostType } from '../../../constants/types/blog'


const BlogNewPage: NextPage<{ defaultValues: BlogPostType }> = ({ defaultValues }) => {
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
