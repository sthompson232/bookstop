import Link from 'next/link'
// Local component
import LogoutButton from './LogoutButton'
// Constants
import { LOGIN_URL } from '../../../../constants/urls'
// Utils
import { useUser } from '../../../../swr/hooks'


const AdminPanel = () => {
	const { isAuthenticated, user } = useUser()

	return (
		<div className="bg-black p-3">
			{isAuthenticated ? (
				<div className="flex justify-between items-center">
					<h5 className="text-white">{user.email}</h5>
					<LogoutButton />
				</div>
			) : (
				<div className="flex justify-end items-center">
					<Link href={LOGIN_URL} passHref>
						<h5 className="text-white cursor-pointer">Login</h5>
					</Link>
				</div>
			)}
		</div>
	)
}

export default AdminPanel
