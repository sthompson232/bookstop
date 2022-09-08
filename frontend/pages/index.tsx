import { Fragment } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'


const Home: NextPage = () => {

  return (
    <Fragment>
      <Head>
        <title>Home | Bookstop</title>
        <meta name="description" content="Bookstop home page" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
			<div className="max-w-8xl mx-auto p-4 sm:px-8"> 
				<Link href="/blog" passHref>
					<h1 className="text-2xl cursor-pointer">Blog</h1>
				</Link>
			</div>
		</Fragment>
  )
}

export default Home
