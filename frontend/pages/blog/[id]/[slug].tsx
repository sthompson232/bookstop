import { GetServerSideProps, NextPage } from 'next'
// Local components
import BlogPost from '../../../components/blog/BlogPost'
// Constants
import { BLOG_RETREIVE_ENDPOINT } from '../../../constants/urls'
import { getUnauthorizedRestAPIHeaders } from '../../../utils/headers'
import { BlogPostType } from '../../../constants/types/blog'


interface PropTypes {
  post: BlogPostType,
}

const BlogPostDetail: NextPage<PropTypes> = ({ post }) => {
  return (
    <div className="container">
      <BlogPost title={post.title} content={post.content} publishDate={post.publish_date} user={post.user} />
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const blogPostId = context.params?.id
  let post;
  if (blogPostId) {
    post = await fetch(BLOG_RETREIVE_ENDPOINT.replace('$(id)', blogPostId.toString()), {
      method: 'GET',
      headers: {
        ...getUnauthorizedRestAPIHeaders(),
      }
    }).then(res => res.json())
  }

  return {
    props: {
      post,
    }
  }
}

export default BlogPostDetail
