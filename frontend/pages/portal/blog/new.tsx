import type { NextPage } from 'next';
// Local components
import BlogPostForm from '../../../components/forms/forms/blog/BlogPostForm';
// Constants
import { blogPostDefaultValues } from '../../../components/forms/schema/blog';

const BlogNewPage: NextPage = () => (
  <BlogPostForm defaultValues={blogPostDefaultValues} editing={false} />
);

export default BlogNewPage;
