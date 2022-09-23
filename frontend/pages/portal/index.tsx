import type { NextPage } from 'next'
import Link from 'next/link'
// Constants
import { PORTAL_BLOG_URL } from '../../constants/urls'


const PortalPage: NextPage = () => (
  <div className="container">
    <h1>Portal home</h1>
    <Link href={PORTAL_BLOG_URL} passHref>Manage blog</Link>
  </div>
)


export default PortalPage
