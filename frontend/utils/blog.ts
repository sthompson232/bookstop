import { BLOG_DRAFT, BLOG_PENDING, BLOG_PUBLISHED } from '../constants/blog'


export const getBlogPostStatusText = (status: number) => {
  switch (status) {
    case BLOG_DRAFT: return 'Draft'
    case BLOG_PENDING: return 'Pending'
    case BLOG_PUBLISHED: return 'Published'
    default: return 'Published'
  }
}
