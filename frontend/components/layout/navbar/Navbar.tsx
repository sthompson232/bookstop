import Link from 'next/link'
import { HOME_URL, LOGIN_URL } from '../../../constants/urls'


const Navbar = () => {
	const pages = [
    {
      "name": "Home",
      "link": HOME_URL
    }
  ];

	return (
		<header>
			<div className="flex justify-end items-center bg-black p-3">
				<Link href={LOGIN_URL} passHref>
					<h5 className="text-white cursor-pointer">Login</h5>
				</Link>
			</div>
			<div className="flex justify-between items-center p-6 shadow-lg">
				<Link href={HOME_URL} passHref>
					<h1 className="text-3xl font-bold tracking-wider cursor-pointer">Bookstop</h1>
				</Link>
				<div>
					{pages.map(page => (
						<Link href={page.link} passHref key={page.link}>
							<h4 className="text-lg font-semibold tracking-wider cursor-pointer">{page.name}</h4>
						</Link>
					))}
				</div>
			</div>
		</header>
	)
}

export default Navbar
