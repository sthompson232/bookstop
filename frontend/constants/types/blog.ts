import { UserType } from './accounts'


export interface BlogPostType {
  id?: number,
  user?: UserType,
  status?: number,
  title: string,
  content: string,
  publish_date: string,
}
