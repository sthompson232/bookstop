import { Fragment } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useUser } from '../swr/hooks'


const Home: NextPage = () => {
	const { loading, loggedOut, user, mutate } = useUser()
	console.log('loading', loading, 'loggedOut', loggedOut, 'user', user)

  return (
    <Fragment>
      <Head>
        <title>Home | Bookstop</title>
        <meta name="description" content="Bookstop home page" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
			<div className="max-w-8xl mx-auto p-4 sm:px-8"> 
				<h1 className="text-2xl">Hi</h1>
			</div>
		</Fragment>
  )
}

export default Home
