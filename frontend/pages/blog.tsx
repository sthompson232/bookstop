import { Fragment } from 'react'
import Head from 'next/head'

const BlogPage = () => {
	return (
		<Fragment>
			<Head>
        <title>Home | Blog</title>
        <meta name="description" content="Bookstop blog page" />
      </Head>
			<div className="container">
				<h1>Blog page</h1>
			</div>
		</Fragment>
	)
}

export default BlogPage
